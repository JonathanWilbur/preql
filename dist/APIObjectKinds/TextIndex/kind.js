"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const validateIndex_1 = __importDefault(require("../validateIndex"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(schema_1.default);
const kind = {
    name: 'TextIndex',
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: validateIndex_1.default,
    transpilePresenceIn: new Map([
        [
            'mariadb',
            (apiObject) => {
                const schemaName = apiObject.spec.databaseName;
                const tableName = apiObject.spec.structName;
                const indexName = apiObject.spec.name;
                const storedProcedureName = `create_index_${indexName}`;
                const columnString = apiObject.spec.keyColumns
                    .map((key) => `${key.name} ${(key.ascending ? 'ASC' : 'DESC')}`)
                    .join(', ');
                return (`DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
                    + 'DELIMITER $$\r\n'
                    + `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n`
                    + 'BEGIN\r\n'
                    + '\tDECLARE EXIT HANDLER FOR 1061 DO 0;\r\n'
                    + `\tALTER TABLE ${schemaName}.${tableName}\r\n`
                    + `\tADD FULLTEXT INDEX (${columnString});\r\n`
                    + 'END $$\r\n'
                    + 'DELIMITER ;\r\n'
                    + `CALL ${storedProcedureName};\r\n`
                    + `DROP PROCEDURE IF EXISTS ${storedProcedureName};`);
            },
        ],
    ]),
    transpileAbsenceIn: new Map([
        [
            'mariadb',
            (apiObject) => 'ALTER TABLE '
                + `${apiObject.spec.databaseName}.${apiObject.spec.structName} DROP PRIMARY KEY;`,
        ],
    ]),
};
exports.default = kind;
