import { Handler, Context, Callback } from "aws-lambda";
import { ConsoleLogger } from "../../Loggers/ConsoleLogger";
const logger : ConsoleLogger = new ConsoleLogger();
import { dataTypes } from "../../DataTypes/index";
import Ajv = require("ajv");
import { rootSchema } from "../../Schema/index";

const ajv : Ajv.Ajv = new Ajv();
const validate = ajv.compile(rootSchema);

function convertPreqlTypeToNativeType (path : [ string, string, string ], spec : any) : string {
    const type : string = spec["type"].toLowerCase();
    if (type in dataTypes) {
        return dataTypes[type].mariadb.equivalentNativeType(path, spec, logger);
    } else throw new Error(`${path}: Unrecognized type: ${type}`);
}

function transpileCheckExpressions (path : [ string, string, string ], spec : any) : string[] {
    const type : string = spec["type"].toLowerCase();
    if (type in dataTypes) {
        return dataTypes[type].mariadb.checkConstraints(path, spec, logger);
    } else throw new Error(`${path}: Unrecognized type: ${type}`);
}

function transpileCheckConstraints (path : [ string, string, string ], spec : any) : string {
    const tableName : string = path[1];
    const columnName : string = path[2];
    // TODO: Review constraint name size limits
    const constraintName : string = `check_${columnName}_is_valid_${spec.type}`;
    const constraintExpressions : string[] = transpileCheckExpressions(path, spec);
    if (constraintExpressions.length === 0) return "";
    return (
        `ALTER TABLE ${tableName}\r\n` +
        `DROP CONSTRAINT IF EXISTS ${constraintName};\r\n` +
        `ALTER TABLE ${tableName}\r\n` +
        `ADD CONSTRAINT IF NOT EXISTS ${constraintName}\r\n` +
        "CHECK (\r\n\t" + constraintExpressions.join(" AND\r\n\t") + "\r\n);"
    );
}

// function transpileTriggers (path : [ string, string, string ], spec : any) : string[] {
//     const type : string = spec["type"].toLowerCase();
//     if (type in dataTypes) {
//         return dataTypes[type].mariadb.getters(path, spec, logger);
//     } else throw new Error(`${path}: Unrecognized type: ${type}`);
// }

function transpileColumn (path : [ string, string, string ], spec : any) : string {
    const tableName : string = path[1];
    const columnName : string = path[2];
    let columnString : string = `ALTER TABLE ${tableName}\r\nADD COLUMN IF NOT EXISTS ${columnName} `;
    columnString += convertPreqlTypeToNativeType(path, spec);
    if (spec["nullable"]) columnString += " NULL";
    else columnString += " NOT NULL";
    // Simply quoting the default value is fine, because MySQL will cast it.
    if (spec["default"]) columnString += ` DEFAULT '${spec["default"]}'`;
    if ("comment" in spec && spec["comment"] !== "")
        columnString += `\r\nCOMMENT '${spec["comment"]}'`;
    columnString += ";";
    logger.debug(path, "Transpiled.");
    return columnString;
}

function transpileTable (path : [ string, string ], spec : any) : string {
    const schemaName : string = path[0];
    const tableName : string = path[1];
    let columnStrings : string[] = [];
    let checkConstraintStrings : string[] = [];
    if ("columns" in spec) {
        Object.keys(spec["columns"]).forEach((columnName : string) : void => {
            const columnSpec : any = spec["columns"][columnName];
            const columnPath : [ string, string, string ] = [ schemaName, tableName, columnName ];
            const columnString : string = transpileColumn(columnPath, columnSpec);
            columnStrings.push(columnString);
            const checkConstraint : string = transpileCheckConstraints(columnPath, columnSpec)
            if (checkConstraint.length !== 0) checkConstraintStrings.push(checkConstraint);
        });
    }
    logger.info(path, "Transpiled.");
    return (
        `CREATE TABLE IF NOT EXISTS ${tableName} (__placeholder__ BOOLEAN);\r\n\r\n` +
        columnStrings.join("\r\n\r\n") + "\r\n\r\n" +
        `ALTER TABLE ${tableName} DROP COLUMN IF EXISTS __placeholder__;\r\n\r\n` +
        checkConstraintStrings.join("\r\n\r\n")
    );
};

function transpileSchema (path : [ string ], spec : any) : string {
    let result : string = "";
    if ("tables" in spec) {
        Object.keys(spec["tables"]).forEach((tableName : string) : void => {
            result += transpileTable([ path[0], tableName ], spec["tables"][tableName]);
        });
    }
    logger.info(path, "Transpiled.");
    return result;
};

function transpile (spec : any, callback : Callback<object>) : void {
    const result = {
        value: ""
    };
    if ("schema" in spec) {
        Object.keys(spec["schema"]).forEach((schemaName : string) : void => {
            try {
                result.value += transpileSchema([ schemaName ], spec["schema"][schemaName]);
            } catch (e) {
                logger.error([ schemaName ], (<Error>e).message);
            }
        });
    }
    callback(null, result);
};

const handler : Handler<any, object> = (event : any, context : Context, callback : Callback<object>) => {
    // REVIEW: Handle JSON and YAML strings, too?
    if (!(typeof event === "object")) callback(new Error("Event was not of an object type."));
    const valid : boolean = <boolean>validate(event);
    if (!valid) callback(new Error("Input PreQL was invalid."));
    transpile(event, callback);
};

export { handler };