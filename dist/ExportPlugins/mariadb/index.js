"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleLogger_1 = require("../../Loggers/ConsoleLogger");
const logger = new ConsoleLogger_1.ConsoleLogger();
function convertPreqlTypeToNativeType(path, spec) {
    const type = spec["type"];
    const length = (("length" in spec) ? spec.length : 1);
    if (isNaN(length))
        throw new Error("Non-numeric length received.");
    if (length < 0)
        throw new Error("Negative length received.");
    if (length === 0)
        throw new Error("Zero-length received.");
    switch (type.toLowerCase()) {
        case ("boolean"): return "BOOLEAN";
        case ("percent"): return "DOUBLE UNSIGNED";
        case ("serial"): return "SERIAL";
        case ("date"): return "DATE";
        case ("year"): return "YEAR";
        case ("month"): return "TINYINT UNSIGNED";
        case ("day"): return "TINYINT UNSIGNED";
        case ("time"): return "TIME";
        case ("datetime"): return "DATETIME";
        case ("timestamp"): return "TIMESTAMP";
        case ("money"): return "DECIMAL(21,2)";
        case ("geometry"): return "GEOMETRY";
        case ("point"): return "POINT";
        case ("line"): return "LINE";
        case ("polygon"): return "POLYGON";
        case ("json"): return "JSON";
        case ("xml"): return "LONGTEXT";
        case ("yaml"): return "LONGTEXT";
        case ("toml"): return "LONGTEXT";
        case ("uuid"): return "CHAR(36)";
        case ("oid"): return "VARCHAR(256)";
        case ("sid"): return "VARCHAR(128)";
        case ("uri"): return "MEDIUMTEXT";
        case ("iri"): return "MEDIUMTEXT";
        case ("irn"): return "TINYTEXT";
        case ("email"): return "TINYTEXT";
        case ("dnslabel"): return "VARCHAR(63)";
        case ("fqdn"): return "TINYTEXT";
        case ("dn"): return "MEDIUMTEXT";
        case ("inet"): return "VARCHAR(19)";
        case ("cidr"): return "VARCHAR(19)";
        case ("macaddr"): return "BINARY(6)";
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
function transpileCheckExpressions(path, spec) {
    const schemaName = path[0];
    const tableName = path[1];
    const columnName = path[2];
    const type = spec["type"];
    const length = (("length" in spec) ? spec.length : 1);
    if (isNaN(length))
        throw new Error("Non-numeric length received.");
    if (length < 0)
        throw new Error("Negative length received.");
    if (length === 0)
        throw new Error("Zero-length received.");
    switch (type.toLowerCase()) {
        case ("percent"): return [`${columnName} <= 100.00000000`];
        case ("month"): return [`${columnName} < 12`];
        case ("day"): return [`${columnName} < 31`];
        case ("uuid"): return [`${columnName} RLIKE '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'`];
        case ("oid"): return [`${columnName} RLIKE '^\d+(?:\.\d+)*$'`];
        case ("sid"): return [`${columnName} RLIKE '^S-\d-\d+(?:-\d+)*$'`];
        case ("iri"): return [`${columnName} RLIKE '^[A-Za-z][A-Za-z0-9\+\.\-]+:\W+$'`];
        case ("irn"): return [`${columnName} RLIKE '^urn:[A-Za-z0-9][A-Za-z0-9\-]{0,30}[A-Za-z0-9]:[^\w\u0000-\u001F"#<>]+$'`];
        case ("email"): return [`${columnName} RLIKE '^\\X{1,64}@[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\-_\.]{0,251}[\\p{L}\\p{N}])?$' OR ${columnName} RLIKE '^\\X{1,64}@\[(?:(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d?|0)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d?|0)\]$' OR ${columnName} RLIKE '^^\\X{1,64}@\[IPv6:(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\]$'`];
        case ("dnslabel"): return [
            `${columnName} RLIKE '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\-_]{0,61}[\\p{L}\\p{N}])?$'`,
            `LENGTH(${columnName}) <= 63`
        ];
        case ("fqdn"): return [
            `${columnName} RLIKE '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\-_\.]{0,251}[\\p{L}\\p{N}])?$'`,
            `LENGTH(${columnName}) <= 253`
        ];
        case ("dn"): return [`${columnName} RLIKE '^\\X=\\X(?:(\\,|;)\\X=\\X)*$'`];
        case ("inet"): return [`${columnName} RLIKE '^(?:(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d?|0)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d?|0)(?:/(3[0-2]|[12]\d|[1-9]|0))?$' OR ${columnName} RLIKE '^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))(?:/(3[0-2]|[12]\d|[1-9]|0))?$'`];
        case ("cidr"): return [`${columnName} RLIKE '^(?:(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d?|0)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d?|0)/(3[0-2]|[12]\d|[1-9]|0)$' OR ${columnName} RLIKE '^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/(3[0-2]|[12]\d|[1-9]|0)$'`];
        case ("macaddr"): return [`${columnName} RLIKE '^(?:[0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$' OR ${columnName} RLIKE '^(?:[0-9a-fA-F]{2}\-){5}[0-9a-fA-F]{2}$' OR ${columnName} RLIKE '^[0-9a-fA-F]{6}:[0-9a-fA-F]{6}$' OR ${columnName} RLIKE '^[0-9a-fA-F]{6}\-[0-9a-fA-F]{6}$' OR ${columnName} RLIKE '^[0-9a-fA-F]{4}\.[0-9a-fA-F]{4}\.[0-9a-fA-F]{4}$' OR ${columnName} RLIKE '^[0-9a-fA-F]{12}$'`];
        case ("sint"): {
            if ([8, 16, 32, 64].includes(length))
                return [];
            const max = (Math.pow(2, (length - 1)) - 1);
            const min = -(Math.pow(2, (length - 1)));
            return [`${columnName} <= ${max} AND ${columnName} >= ${min}`];
        }
        case ("uint"): {
            if ([8, 16, 32, 64].includes(length))
                return [];
            const max = Math.pow(2, length);
            return [`${columnName} <= ${max}`];
        }
        case ("sreal"): return [];
        case ("ureal"): return [];
        case ("fixchar"): return [];
        case ("varchar"): return [];
        case ("text"): {
            if ([8, 16, 24, 32].includes(length))
                return [];
            const numberOfCharacters = Math.pow(2, length);
            return [`${columnName} <= ${numberOfCharacters}`];
        }
        case ("blob"): {
            if ([8, 16, 24, 32].includes(length))
                return [];
            const numberOfBytes = Math.pow(2, length);
            return [`${columnName} <= ${numberOfBytes}`];
        }
        default: return [];
    }
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
// transpileTriggers
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
    if ("columns" in spec) {
        Object.keys(spec["columns"]).forEach((columnName) => {
            const columnSpec = spec["columns"][columnName];
            const columnPath = [schemaName, tableName, columnName];
            const columnString = transpileColumn(columnPath, columnSpec);
            columnStrings.push(columnString);
            checkConstraintStrings = checkConstraintStrings.concat(transpileCheckConstraints(columnPath, columnSpec));
        });
    }
    logger.info(path, "Transpiled.");
    return (`CREATE TABLE IF NOT EXISTS ${tableName} (__placeholder__ BOOLEAN);\r\n\r\n` +
        columnStrings.join("\r\n\r\n") + "\r\n\r\n" +
        `ALTER TABLE ${tableName} DROP COLUMN IF EXISTS __placeholder__;\r\n\r\n` +
        checkConstraintStrings.filter((constraint) => {
            return (constraint !== "");
        }).join("\r\n\r\n"));
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
            result.value += transpileSchema([schemaName], spec["schema"][schemaName]);
        });
    }
    callback(null, result);
}
;
const handler = (event, context, callback) => {
    if (!(typeof event === "object"))
        callback("Event was not of an object type.");
    transpile(event, callback);
};
exports.handler = handler;
