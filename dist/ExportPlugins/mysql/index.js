"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleLogger_1 = require("../../Loggers/ConsoleLogger");
const logger = new ConsoleLogger_1.ConsoleLogger();
const TARGET_DIALECT = "MySQL";
// xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
// S-1-5-80-859482183-879914841-863379149-1145462774-2388618682
// TODO: Append warnings in comments
function convertPreqlTypeToNativeType(path, type, length = 1) {
    if (isNaN(length))
        throw new Error("Non-numeric length received.");
    if (length < 0)
        throw new Error("Negative length received.");
    if (length === 0)
        throw new Error("Zero-length received.");
    switch (type.toLowerCase()) {
        case ("boolean"): return "BOOLEAN";
        case ("percent"): return "DOUBLE UNSIGNED"; // TODO: Check
        case ("serial"): return "SERIAL";
        case ("date"): return "DATE";
        case ("year"): return "YEAR";
        case ("month"): return "TINYINT UNSIGNED";
        case ("day"): return "TINYINT UNSIGNED";
        case ("time"): return "TIME";
        case ("datetime"): return "DATETIME";
        case ("timestamp"): return "TIMESTAMP";
        case ("money"): return "DECIMAL(21,2)"; // TODO: Check
        case ("geometry"): return "GEOMETRY";
        case ("point"): return "POINT";
        case ("line"): return "LINE";
        case ("polygon"): return "POLYGON";
        case ("json"): return "JSON";
        case ("xml"): return "LONGTEXT";
        case ("yaml"): return "LONGTEXT"; // TODO: Check
        case ("toml"): return "LONGTEXT"; // TODO: Check
        case ("uuid"): return "CHAR(36)"; // TODO: Check for xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        case ("oid"): return "VARCHAR(256)"; // TODO: check
        case ("sid"): return "VARCHAR(128)"; // TODO: Check and find actual specification.
        case ("uri"): return "MEDIUMTEXT"; // TODO: Check
        case ("urn"): return "TINYTEXT"; // TODO: Check
        case ("email"): return "TINYTEXT"; // TODO: Check
        case ("dnslabel"): return "VARCHAR(63)"; // TODO: Check
        case ("fqdn"): return "TINYTEXT"; // TODO: Check
        case ("dn"): return "MEDIUMTEXT"; // TODO: Check
        case ("inet"): return "VARCHAR(19)"; // TODO: Check
        case ("cidr"): return "VARCHAR(19)"; // TODO: Check
        case ("macaddr"): return "BINARY(6)"; // TODO: Check
        case ("sint"): {
            if (length === 1) {
                logger.warn(path, "sint with a length of 1 has been transpiled to a BOOLEAN.");
                return "BOOLEAN";
            }
            if (length <= 8)
                return "TINYINT SIGNED";
            if (length <= 16)
                return "SMALLINT SIGNED";
            if (length <= 32)
                return "INTEGER SIGNED";
            if (length <= 64)
                return "BIGINT SIGNED";
            logger.warn(path, `No native signed integral type can support ${length} bits. Defaulting to BIGINT SIGNED.`);
            return "BIGINT SIGNED";
        }
        case ("uint"): {
            if (length === 1) {
                logger.warn(path, "uint with a length of 1 has been transpiled to a BOOLEAN.");
                return "BOOLEAN";
            }
            if (length <= 8)
                return "TINYINT UNSIGNED";
            if (length <= 16)
                return "SMALLINT UNSIGNED";
            if (length <= 32)
                return "INTEGER UNSIGNED";
            if (length <= 64)
                return "BIGINT UNSIGNED";
            logger.warn(path, `No native unsigned integral type can support ${length} bits. Defaulting to BIGINT UNSIGNED.`);
            return "BIGINT UNSIGNED";
        }
        case ("sreal"): {
            if (length <= 8)
                return "FLOAT SIGNED";
            if (length <= 16)
                return "FLOAT SIGNED";
            if (length <= 32)
                return "FLOAT SIGNED";
            if (length <= 64)
                return "DOUBLE SIGNED";
            logger.warn(path, `No native signed floating-point type can support ${length} bits. Defaulting to DOUBLE SIGNED.`);
            return "DOUBLE SIGNED";
        }
        case ("ureal"): {
            if (length <= 8)
                return "FLOAT UNSIGNED";
            if (length <= 16)
                return "FLOAT UNSIGNED";
            if (length <= 32)
                return "FLOAT UNSIGNED";
            if (length <= 64)
                return "DOUBLE UNSIGNED";
            logger.warn(path, `No native unsigned floating-point type can support ${length} bits. Defaulting to DOUBLE UNSIGNED.`);
            return "DOUBLE UNSIGNED";
        }
        case ("fixchar"): return `CHAR(${length})`;
        case ("varchar"): return `VARCHAR(${length})`;
        case ("text"): {
            if (length < 8) {
                const numberOfCharacters = Math.pow(2, length);
                logger.warn(path, `A fixchar or varchar with a length of ${numberOfCharacters} characters could have been used instead for better performance.`);
            }
            if (length <= 8)
                return "TINYTEXT";
            if (length <= 16)
                return "TEXT";
            if (length <= 24)
                return "MEDIUMTEXT";
            if (length <= 32)
                return "LONGTEXT";
            logger.warn(path, `No native text type can support a length that encodes on ${length} bits. Defaulting to LONGTEXT.`);
            return "LONGTEXT";
        }
        case ("blob"): {
            if (length < 8) {
                const numberOfBytes = Math.pow(2, length);
                logger.warn(path, `A fixblob or varblob with a length of ${numberOfBytes} bytes could have been used instead for better performance.`);
            }
            if (length <= 8)
                return "TINYBLOB";
            if (length <= 16)
                return "BLOB";
            if (length <= 24)
                return "MEDIUMBLOB";
            if (length <= 32)
                return "LONGBLOB";
            logger.warn(path, `No native blob type can support a length that encodes on ${length} bits. Defaulting to LONGBLOB.`);
            return "LONGBLOB";
        }
        default: {
            const baseMatch = /^((fix|var))base(\d+)$/i.exec(type);
            if (baseMatch) {
                const base = parseInt(baseMatch[2]);
                if (!(new Set([2, 8, 10, 16, 32, 36, 58, 64])).has(base))
                    throw new Error(`${baseMatch[1]}base with a base of ${baseMatch[2]} is not supported.`);
                const fixed = (baseMatch[1] === "fix");
                if (fixed) {
                    logger.warn(path, "fixbase cannot be larger than 255 characters.");
                    return `CHAR(${length})`;
                }
                else {
                    logger.warn(path, "varbase cannot be larger than 65536 characters.");
                    return `VARCHAR(${length})`;
                }
            }
            throw new Error(`Type '${type}' not recognized.`);
        }
    }
}
function transpileColumn(path, spec) {
    const tableName = path[1];
    const columnName = path[2];
    let columnString = `ALTER TABLE ${tableName}\r\nADD COLUMN ${columnName} `;
    columnString += convertPreqlTypeToNativeType(path, spec["type"]);
    if (spec["nullable"])
        columnString += " NULL";
    else
        columnString += " NOT NULL";
    // TODO: Check that "DEFAULT" type matches data type.
    if (spec["default"])
        columnString += ` DEFAULT ${spec["default"]}`;
    if ("comment" in spec && spec["comment"] !== "")
        columnString += `\r\nCOMMENT '${spec["comment"]}'`;
    columnString += ";";
    return columnString;
}
function transpileTable(path, spec) {
    const schemaName = path[0];
    const tableName = path[1];
    let columnStrings = [];
    if ("columns" in spec) {
        Object.keys(spec["columns"]).forEach((columnName) => {
            const columnSpec = spec["columns"][columnName];
            const columnPath = [schemaName, tableName, columnName];
            const columnString = transpileColumn(columnPath, columnSpec);
            columnStrings.push(columnString);
        });
    }
    return (`CREATE TABLE IF NOT EXISTS ${tableName} (__placeholder__ BOOLEAN);\r\n\r\n` +
        columnStrings.join("\r\n\r\n") + "\r\n\r\n" +
        `ALTER TABLE ${tableName} DROP COLUMN IF EXISTS __placeholder__;\r\n\r\n`);
}
;
function transpileSchema(path, spec) {
    let ret = "";
    if ("tables" in spec) {
        Object.keys(spec["tables"]).forEach((tableName) => {
            ret += transpileTable([path[0], tableName], spec["tables"][tableName]);
        });
    }
    return ret;
}
;
function transpile(spec, callback) {
    let ret = "";
    if ("schema" in spec) {
        Object.keys(spec["schema"]).forEach((schemaName) => {
            ret += transpileSchema([schemaName], spec["schema"][schemaName]);
        });
    }
    callback(null, ret);
}
;
// TODO: Return an object
const handler = (event, context, callback) => {
    if (!(typeof event === "object"))
        callback("Event was not of an object type.");
    transpile(event, callback);
};
exports.handler = handler;
