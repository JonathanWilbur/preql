"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleLogger_1 = require("../../Loggers/ConsoleLogger");
const logger = new ConsoleLogger_1.ConsoleLogger();
const index_1 = require("../../DataTypes/index");
const Ajv = require("ajv");
const index_2 = require("../../Schema/index");
const ajv = new Ajv();
const validate = ajv.compile(index_2.rootSchema);
function convertPreqlTypeToNativeType(path, spec) {
    const type = spec["type"].toLowerCase();
    if (type in index_1.dataTypes) {
        return index_1.dataTypes[type].mariadb.equivalentNativeType(path, spec, logger);
    }
    else
        throw new Error(`${path}: Unrecognized type: ${type}`);
}
function transpileCheckExpressions(path, spec) {
    const type = spec["type"].toLowerCase();
    if (type in index_1.dataTypes) {
        return index_1.dataTypes[type].mariadb.checkConstraints(path, spec, logger);
    }
    else
        throw new Error(`${path}: Unrecognized type: ${type}`);
}
function transpileCheckConstraints(path, spec) {
    const tableName = path[1];
    const columnName = path[2];
    // TODO: Review constraint name size limits
    const constraintName = `check_${columnName}_is_valid_${spec.type}`;
    const constraintExpressions = transpileCheckExpressions(path, spec);
    if (constraintExpressions.length === 0)
        return "";
    return (`ALTER TABLE ${tableName}\r\n` +
        `DROP CONSTRAINT IF EXISTS ${constraintName};\r\n` +
        `ALTER TABLE ${tableName}\r\n` +
        `ADD CONSTRAINT IF NOT EXISTS ${constraintName}\r\n` +
        "CHECK (\r\n\t" + constraintExpressions.join(" AND\r\n\t") + "\r\n);");
}
function transpileTriggers(path, spec) {
    const type = spec["type"].toLowerCase();
    if (type in index_1.dataTypes) {
        let ret = [];
        const setters = index_1.dataTypes[type].mariadb.setters(path, spec, logger);
        Object.keys(setters)
            .forEach((key) => {
            const triggerBaseName = `${path[0]}.${path[1]}_${path[2]}_${key}`;
            let triggerString = ["INSERT", "UPDATE"].map((event) => `DROP TRIGGER IF EXISTS ${triggerBaseName}_${event.toLowerCase()};\r\n` +
                `CREATE TRIGGER IF NOT EXISTS ${triggerBaseName}_${event.toLowerCase()}\r\n` +
                `BEFORE ${event} ON ${path[0]}.${path[1]} FOR EACH ROW\r\n` +
                `SET NEW.${path[2]} = ${setters[key]};`).join("\r\n\r\n");
            ret.push(triggerString);
        });
        return ret;
    }
    else
        throw new Error(`${path}: Unrecognized type: ${type}`);
}
function transpileColumn(path, spec) {
    const tableName = path[1];
    const columnName = path[2];
    let columnString = `ALTER TABLE ${tableName}\r\nADD COLUMN IF NOT EXISTS ${columnName} `;
    columnString += convertPreqlTypeToNativeType(path, spec);
    if (spec["nullable"])
        columnString += " NULL";
    else
        columnString += " NOT NULL";
    // Simply quoting the default value is fine, because MySQL will cast it.
    if (spec["default"])
        columnString += ` DEFAULT '${spec["default"]}'`;
    if ("comment" in spec && spec["comment"] !== "")
        columnString += `\r\nCOMMENT '${spec["comment"]}'`;
    columnString += ";";
    logger.debug(path, "Transpiled.");
    return columnString;
}
function transpileTable(path, spec) {
    const schemaName = path[0];
    const tableName = path[1];
    let columnStrings = [];
    let checkConstraintStrings = [];
    let triggerStrings = [];
    if ("columns" in spec) {
        Object.keys(spec["columns"]).forEach((columnName) => {
            const columnSpec = spec["columns"][columnName];
            const columnPath = [schemaName, tableName, columnName];
            const columnString = transpileColumn(columnPath, columnSpec);
            columnStrings.push(columnString);
            const checkConstraint = transpileCheckConstraints(columnPath, columnSpec);
            if (checkConstraint.length !== 0)
                checkConstraintStrings.push(checkConstraint);
            triggerStrings = triggerStrings.concat(transpileTriggers(columnPath, columnSpec));
        });
    }
    logger.info(path, "Transpiled.");
    return (`CREATE TABLE IF NOT EXISTS ${tableName} (__placeholder__ BOOLEAN);\r\n\r\n` +
        columnStrings.join("\r\n\r\n") + "\r\n\r\n" +
        `ALTER TABLE ${tableName} DROP COLUMN IF EXISTS __placeholder__;\r\n\r\n` +
        checkConstraintStrings.join("\r\n\r\n") + "\r\n\r\n" +
        triggerStrings.join("\r\n\r\n"));
}
;
function transpileSchema(path, spec) {
    let result = "";
    if ("tables" in spec) {
        Object.keys(spec["tables"]).forEach((tableName) => {
            result += transpileTable([path[0], tableName], spec["tables"][tableName]);
        });
    }
    logger.info(path, "Transpiled.");
    return result;
}
;
function transpile(spec, callback) {
    const result = {
        value: ""
    };
    if ("schema" in spec) {
        Object.keys(spec["schema"]).forEach((schemaName) => {
            try {
                result.value += transpileSchema([schemaName], spec["schema"][schemaName]);
            }
            catch (e) {
                logger.error([schemaName], e.message);
            }
        });
    }
    callback(null, result);
}
;
const handler = (event, context, callback) => {
    // REVIEW: Handle JSON and YAML strings, too?
    if (!(typeof event === "object"))
        callback(new Error("Event was not of an object type."));
    const valid = validate(event);
    if (!valid)
        callback(new Error("Input PreQL was invalid."));
    transpile(event, callback);
};
exports.handler = handler;
