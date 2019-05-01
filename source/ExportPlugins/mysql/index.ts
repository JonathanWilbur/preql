import { Handler, Context, Callback } from "aws-lambda";

// xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
// S-1-5-80-859482183-879914841-863379149-1145462774-2388618682

function convertPreqlTypeToMySQLType (type : string) : string {
    switch (type.toLowerCase()) {
        case ("boolean"): return "BOOLEAN";
        case ("uint8"): return "TINYINT UNSIGNED";
        case ("sint8"): return "TINYINT SIGNED";
        case ("uint16"): return "SMALLINT UNSIGNED";
        case ("sint16"): return "SMALLINT SIGNED";
        case ("uint32"): return "INTEGER UNSIGNED";
        case ("sint32"): return "INTEGER SIGNED";
        case ("uint64"): return "BIGINT UNSIGNED";
        case ("sint64"): return "BIGINT SIGNED";
        case ("ureal8"): return "FLOAT UNSIGNED";
        case ("sreal8"): return "FLOAT SIGNED";
        case ("ureal16"): return "FLOAT UNSIGNED";
        case ("sreal16"): return "FLOAT SIGNED";
        case ("ureal32"): return "FLOAT UNSIGNED";
        case ("sreal32"): return "FLOAT SIGNED";
        case ("ureal64"): return "DOUBLE UNSIGNED";
        case ("sreal64"): return "DOUBLE SIGNED";
        case ("serial"): return "SERIAL";
        case ("text8"): return "TINYTEXT";
        case ("text16"): return "MEDIUMTEXT";
        case ("text32"): return "TEXT";
        case ("text64"): return "LONGTEXT";
        case ("blob8"): return "TINYBLOB";
        case ("blob16"): return "MEDIUMBLOB";
        case ("blob32"): return "BLOB";
        case ("blob64"): return "LONGBLOB";
        case ("date"): return "DATE";
        case ("year"): return "YEAR";
        case ("month"): return "TINYINT UNSIGNED";
        case ("day"): return "TINYINT UNSIGNED";
        case ("time"): return "TIME";
        case ("datetime"): return "DATETIME";
        case ("timestamp"): return "TIMESTAMP";
        case ("geometry"): return "GEOMETRY";
        case ("point"): return "POINT";
        case ("line"): return "LINE";
        case ("polygon"): return "POLYGON";
        case ("json"): return "JSON";
        case ("xml"): return "LONGTEXT";
        case ("uuid"): return "CHAR(36)"; // TODO: Check for xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        case ("oid"): return "VARCHAR(256)"; // TODO: check
        case ("sid"): return "VARCHAR(128)"; // TODO: Check and find actual specification.
        case ("uri"): return "MEDIUMTEXT"; // TODO: Check
        case ("urn"): return "TINYTEXT"; // TODO: Check
        case ("email"): return "TINYTEXT"; // TODO: Check
        case ("fqdn"): return "TINYTEXT"; // TODO: Check
        case ("dn"): return "MEDIUMTEXT"; // TODO: Check
        case ("")
        default: {

            // base16(32)
            // base32
            // base36
            // base58
            // base64
            const fixtextMatch : RegExpExecArray | null = /^fixtext\((\d+)\)$/i.exec(type);
            if (fixtextMatch) return `CHAR(${parseInt(fixtextMatch[1])})`;

            const fixblobMatch : RegExpExecArray | null = /^fixblob\((\d+)\)$/i.exec(type);
            if (fixblobMatch) return `VARBINARY(${parseInt(fixblobMatch[1])})`;

            const vartextMatch : RegExpExecArray | null = /^vartext\((\d+)\)$/i.exec(type);
            if (vartextMatch) return `VARCHAR(${parseInt(vartextMatch[1])})`;

            const varblobMatch : RegExpExecArray | null = /^varblob\((\d+)\)$/i.exec(type);
            if (varblobMatch) return `VARBINARY(${parseInt(varblobMatch[1])})`;

            return "WUUUT";
        }
    }
}

function transpileTable (tableName : string, spec : any) : string {
    let columnStrings : string[] = [];
    if ("columns" in spec) {
        Object.keys(spec["columns"]).forEach((columnName : string) : void => {
            const column : any = spec["columns"][columnName];
            let columnString : string = "";
            columnString += columnName + " ";
            columnString += convertPreqlTypeToMySQLType(column["type"]);
            if (column["nullable"]) columnString += " NULL";
            else columnString += " NOT NULL";
            if (column["type"] === "serial")
                columnString += " AUTO_INCREMENT";
            // TODO: Check that "DEFAULT" type matches data type.
            if (column["default"])
                columnString += ` DEFAULT ${column["default"]}`;
            columnString += ` COMMENT '${("comment" in column) ? column["comment"] : ""}'`;
            columnStrings.push(columnString);
        });
    }
    return `CREATE TABLE ${tableName} (\r\n${columnStrings.join(",\r\n\t")}\r\n) COMMENT '${spec["comment"]}';\r\n\r\n`;
};

function transpileSchema (spec : any) : string {
    let ret : string = "";
    if ("tables" in spec) {
        Object.keys(spec["tables"]).forEach((tableName : string) : void => {
            ret += transpileTable(tableName, spec["tables"][tableName]);
        });
    }
    return ret;
};

function transpile (spec : any, callback : Callback<string>) : void {
    let ret : string = "";
    if ("schema" in spec) {
        Object.keys(spec["schema"]).forEach((schemaName : string) : void => {
            ret += transpileSchema(spec["schema"][schemaName]);
        });
    }
    callback(null, ret);
};

const handler : Handler<any, string> = (event : any, context : Context, callback : Callback<string>) : void => {
    if (!(typeof event === "object")) callback("Event was not of an object type.");
    transpile(event, callback);
};

export { handler };