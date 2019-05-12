import { Handler, Context, Callback } from "aws-lambda";
import { ConsoleLogger } from "../../Loggers/ConsoleLogger";
const logger: ConsoleLogger = new ConsoleLogger();
import { dataTypes } from "../../DataTypes/index";
import Ajv = require("ajv");
import { rootSchema } from "../../Schema/index";

const ajv: Ajv.Ajv = new Ajv({
    useDefaults: true
});
const validate = ajv.compile(rootSchema);

function convertPreqlTypeToNativeType (path: [ string, string, string ], spec: any): string {
    const type: string = spec["type"].toLowerCase();
    if (type in dataTypes) {
        return dataTypes[type].mariadb.equivalentNativeType(path, spec, logger);
    } else throw new Error(`${path}: Unrecognized type: ${type}`);
}

function transpileCheckExpressions (path: [ string, string, string ], spec: any): string[] {
    const type: string = spec["type"].toLowerCase();
    if (type in dataTypes) {
        return dataTypes[type].mariadb.checkConstraints(path, spec, logger);
    } else throw new Error(`${path}: Unrecognized type: ${type}`);
}

function transpileCheckConstraints (path: [ string, string, string ], spec: any): string {
    const tableName: string = path[1];
    const columnName: string = path[2];
    // TODO: Review constraint name size limits
    const constraintName = `check_${columnName}_is_valid_${spec.type}`;
    const constraintExpressions: string[] = transpileCheckExpressions(path, spec);
    if (constraintExpressions.length === 0) return "";
    return (
        `ALTER TABLE ${tableName}\r\n` +
        `DROP CONSTRAINT IF EXISTS ${constraintName};\r\n` +
        `ALTER TABLE ${tableName}\r\n` +
        `ADD CONSTRAINT IF NOT EXISTS ${constraintName}\r\n` +
        "CHECK (\r\n\t" + constraintExpressions.join(" AND\r\n\t") + "\r\n);"
    );
}

function transpileTriggers (path: [ string, string, string ], spec: any): string[] {
    const type: string = spec["type"].toLowerCase();
    if (type in dataTypes) {
        let ret: string[] = [];
        const setters: { [ name: string ]: string } = dataTypes[type].mariadb.setters(path, spec, logger);
        Object.keys(setters)
            .forEach((key: string): void => {
                const triggerBaseName = `${path[0]}.${path[1]}_${path[2]}_${key}`;
                let triggerString: string = [ "INSERT", "UPDATE" ].map((event: string): string =>
                    `DROP TRIGGER IF EXISTS ${triggerBaseName}_${event.toLowerCase()};\r\n` +
                    `CREATE TRIGGER IF NOT EXISTS ${triggerBaseName}_${event.toLowerCase()}\r\n` +
                    `BEFORE ${event} ON ${path[0]}.${path[1]} FOR EACH ROW\r\n` +
                    `SET NEW.${path[2]} = ${setters[key]};`
                ).join("\r\n\r\n");
                ret.push(triggerString);
            });
        return ret;
    } else throw new Error(`${path}: Unrecognized type: ${type}`);
}

function transpileColumn (path: [ string, string, string ], spec: any): string {
    const tableName: string = path[1];
    const columnName: string = path[2];
    let columnString = `ALTER TABLE ${tableName}\r\nADD COLUMN IF NOT EXISTS ${columnName} `;
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

function transpileIndexes (path: [ string, string ], spec: any): string[] {
    if (!spec)
        throw new Error(`${transpileIndexes.constructor.name}() received a falsy spec. This is a bug.`);
    return Object.keys(spec)
        .map((indexName: string): string => {
            const storedProcedureName: string = ("create_index_" + indexName);
            const indexType: string = spec[indexName].type.toLowerCase();
            const columnString: string = spec[indexName].keys.map((key: any): string => {
                return `${key.column} ${(key.ascending ? "ASC": "DESC")}`;
            }).join(", ");
            switch (indexType) {
                case ("plain"): {
                    return (
                        `ALTER TABLE ${path[0]}.${path[1]}\r\n` +
                        `ADD INDEX IF NOT EXISTS ${indexName}\r\n` +
                        `PRIMARY KEY (${columnString});`
                    );
                }
                case ("primary"): {
                    const duplicateErrorCode = 1068;
                    return (
                        `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n` +
                        "DELIMITER $$\r\n" +
                        `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n` +
                        `BEGIN\r\n` +
                        `\tDECLARE EXIT HANDLER FOR ${duplicateErrorCode} DO 0;\r\n` +
                        `\tALTER TABLE ${path[0]}.${path[1]}\r\n` +
                        `\tADD CONSTRAINT ${indexName} PRIMARY KEY (${columnString});\r\n` +
                        `END $$\r\n` +
                        `DELIMITER ;\r\n` +
                        `CALL ${storedProcedureName};\r\n` +
                        `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
                    );
                }
                case ("unique"): {
                    const duplicateErrorCode = 1061;
                    return (
                        `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n` +
                        "DELIMITER $$\r\n" +
                        `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n` +
                        `BEGIN\r\n` +
                        `\tDECLARE EXIT HANDLER FOR ${duplicateErrorCode} DO 0;\r\n` +
                        `\tALTER TABLE ${path[0]}.${path[1]}\r\n` +
                        `\tADD CONSTRAINT ${indexName} UNIQUE KEY (${columnString});\r\n` +
                        `END $$\r\n` +
                        `DELIMITER ;\r\n` +
                        `CALL ${storedProcedureName};\r\n` +
                        `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
                    );
                }
                case ("text"): {
                    const duplicateErrorCode = 1061;
                    return (
                        `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n` +
                        "DELIMITER $$\r\n" +
                        `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n` +
                        `BEGIN\r\n` +
                        `\tDECLARE EXIT HANDLER FOR ${duplicateErrorCode} DO 0;\r\n` +
                        `\tALTER TABLE ${path[0]}.${path[1]}\r\n` +
                        `\tADD FULLTEXT INDEX (${columnString});\r\n` +
                        `END $$\r\n` +
                        `DELIMITER ;\r\n` +
                        `CALL ${storedProcedureName};\r\n` +
                        `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
                    );
                }
                case ("spatial"):{
                    const duplicateErrorCode = 1061;
                    return (
                        `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n` +
                        "DELIMITER $$\r\n" +
                        `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n` +
                        `BEGIN\r\n` +
                        `\tDECLARE EXIT HANDLER FOR ${duplicateErrorCode} DO 0;\r\n` +
                        `\tALTER TABLE ${path[0]}.${path[1]}\r\n` +
                        `\tADD SPATIAL INDEX (${columnString});\r\n` +
                        `END $$\r\n` +
                        `DELIMITER ;\r\n` +
                        `CALL ${storedProcedureName};\r\n` +
                        `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
                    );
                }
                default:
                    throw new Error(`${path.join(".")}: Index ${indexName} had unrecognized type '${indexType}'. This error should never have appeared, because index types should have been validated by schema validation.`);
            }
        });
}

function transpileTable (path: [ string, string ], spec: any): string {
    const schemaName: string = path[0];
    const tableName: string = path[1];
    let columnStrings: string[] = [];
    let checkConstraintStrings: string[] = [];
    let triggerStrings: string[] = [];
    if ("columns" in spec) {
        Object.keys(spec["columns"]).forEach((columnName: string): void => {
            const columnSpec: any = spec["columns"][columnName];
            const columnPath: [ string, string, string ] = [ schemaName, tableName, columnName ];
            const columnString: string = transpileColumn(columnPath, columnSpec);
            columnStrings.push(columnString);
            const checkConstraint: string = transpileCheckConstraints(columnPath, columnSpec)
            if (checkConstraint.length !== 0) checkConstraintStrings.push(checkConstraint);
            triggerStrings = triggerStrings.concat(transpileTriggers(columnPath, columnSpec));
        });
    }
    logger.info(path, "Transpiled.");
    return (
        `CREATE TABLE IF NOT EXISTS ${tableName} (__placeholder__ BOOLEAN);\r\n\r\n` +
        columnStrings.join("\r\n\r\n") + "\r\n\r\n" +
        `ALTER TABLE ${tableName} DROP COLUMN IF EXISTS __placeholder__;\r\n\r\n` +
        checkConstraintStrings.join("\r\n\r\n") + "\r\n\r\n" +
        triggerStrings.join("\r\n\r\n") + "\r\n\r\n" +
        transpileIndexes(path, spec["indexes"]).join("\r\n\r\n")
    );
};

function transpileSchema (path: [ string ], spec: any): string {
    let result = "";
    if ("tables" in spec) {
        Object.keys(spec["tables"]).forEach((tableName: string): void => {
            result += transpileTable([ path[0], tableName ], spec["tables"][tableName]);
        });
    }
    logger.info(path, "Transpiled.");
    return result;
};

function main (spec: any, callback: Callback<object>): void {
    const result = {
        value: ""
    };
    if ("schema" in spec) {
        Object.keys(spec["schema"]).forEach((schemaName: string): void => {
            try {
                result.value += transpileSchema([ schemaName ], spec["schema"][schemaName]);
            } catch (e) {
                logger.error([ schemaName ], (e as Error).message);
            }
        });
    }
    callback(null, result);
};

// TODO: Refactor this elsewhere.
// Interfaces must error on mismatching types, nullability, or length.
// Comment and default shall not cause an error.
// Casing is TBD.
function implementInterfaces (spec: any): void {
    // If there are no interfaces, there is nothing to implement.
    // FIXME: Actually, you should still check that tables do not implement interfaces.
    if (!("interfaces" in spec)) return;
    // If there is no schema, there are no tables to implement.
    if (!("schema" in spec)) return;
    for (const schemaName of spec.schema) {
        // If there are no tables, no interfaces can be implemented.
        if (!("tables" in spec.schema[schemaName])) return;
        for (const [tableName, tableSpec] of Object.entries<any>(spec.schema[schemaName].tables)) {
            // If there are no implementations, skip ahead to the next table.
            if (!("implements" in tableSpec)) continue;
            for (const implementationName of tableSpec.implements) {
                if (!(implementationName in spec.interfaces))
                    throw new Error(`Interface '${implementationName}' not found.`);
                if (!("columns" in tableSpec)) tableSpec["columns"] = {};

                for (let [interfaceColumnName, interfaceColumnSpec] of Object.entries<any>(spec.interfaces[implementationName])) {
                    if (interfaceColumnName in tableSpec.columns) { // Conflicting column.
                        const implementationColumnSpec: any = tableSpec.columns[interfaceColumnName];
                        if (implementationColumnSpec.type !== interfaceColumnSpec.type)
                            throw new Error(`Type of column '${interfaceColumnName}' conflicts with column type in implemented interface '${implementationName}'.`);
                        if (implementationColumnSpec.nullable !== interfaceColumnSpec.nullable)
                            throw new Error(`Nullability of column '${interfaceColumnName}' conflicts with column nullability in implemented interface '${implementationName}'.`);
                        if (("length" in implementationColumnSpec) && (interfaceColumnSpec as any).length !== interfaceColumnSpec.length)
                            throw new Error(`Length of column '${interfaceColumnName}' conflicts with column length in implemented interface '${implementationName}'.`);
                    } else { // The column was not implemented at all.
                        tableSpec.columns[interfaceColumnName] = {} as any;
                    }

                    // Setting the values
                    const implementationColumnSpec: any = tableSpec.columns[interfaceColumnName];
                    implementationColumnSpec.nullable = implementationColumnSpec.nullable;
                    if (!("comment" in implementationColumnSpec) && ("comment" in interfaceColumnSpec))
                        implementationColumnSpec.length = implementationColumnSpec.length;
                    if (!("comment" in implementationColumnSpec) && ("comment" in interfaceColumnSpec))
                        implementationColumnSpec.comment = interfaceColumnSpec.comment;
                }

                // Check for conflicting columns.
                for (let [columnName, columnSpec] of Object.entries(tableSpec.columns)) {
                    const implementationColumnSpec: any = spec.interfaces[implementationName][columnName];
                    if (columnName in spec["interfaces"][implementationName]) { // Conflicting column.
                        if ((columnSpec as any).type !== implementationColumnSpec.type)
                            throw new Error(`Type of column '${columnName}' conflicts with column type in implemented interface '${implementationName}'.`);
                        if ((columnSpec as any).nullable !== implementationColumnSpec.nullable)
                            throw new Error(`Nullability of column '${columnName}' conflicts with column nullability in implemented interface '${implementationName}'.`);
                        if (("length" in columnSpec) && (columnSpec as any).length !== implementationColumnSpec.length)
                            throw new Error(`Length of column '${columnName}' conflicts with column length in implemented interface '${implementationName}'.`);
                    } else { // The column was not implemented at all.

                    }

                    // Setting the values
                    (columnSpec as any)["nullable"] = implementationColumnSpec.nullable;
                    (columnSpec as any)["length"] = implementationColumnSpec.length;
                }
                logger.info([ schemaName, tableName ], `Implemented interface ${implementationName}.`);
            }
        }
    }
}

const handler: Handler<any, object> = (event: any, context: Context, callback: Callback<object>): void => {
    // REVIEW: Handle JSON and YAML strings, too?
    if (!(typeof event === "object")) callback(new Error("Event was not of an object type."));
    const valid: boolean = validate(event) as boolean;
    if (!valid) callback(new Error("Input PreQL was invalid."));
    main(event, callback);
};

export { handler };