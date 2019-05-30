"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const matchingResource_1 = __importDefault(require("../matchingResource"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(schema_1.default);
const kind = {
    name: 'PrimaryIndex',
    getPath: (apiObject) => {
        const databaseName = apiObject.spec.databaseName || '';
        const structName = apiObject.spec.structName || '';
        const indexName = apiObject.spec.name;
        return `${databaseName}.${structName}.${indexName}`;
    },
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    // TODO: Log warnings for includedColumns, because they are not used.
    validateSemantics: async (apiObject, etcd) => {
        if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
            throw new Error(`No databases found that are named '${apiObject.spec.databaseName}' for PrimaryIndex `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (!matchingResource_1.default(apiObject.spec.structName, 'struct', etcd)) {
            throw new Error(`No structs found that are named '${apiObject.spec.structName}' for PrimaryIndex `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        const columns = etcd.kindIndex.get('attribute');
        if (!columns) {
            throw new Error(`No attributes found for PrimaryIndex '${apiObject.metadata.name}' `
                + 'to index.');
        }
        // Check that the columns are real
        apiObject.spec.keyColumns.forEach((kc) => {
            const columnFound = columns.some((column) => column.spec.name === kc.name);
            if (!columnFound) {
                throw new Error(`No attribute named '${kc.name}' for PrimaryIndex '${apiObject.metadata.name}' to index.`);
            }
        });
    },
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
                return (`DROP PROCEDURE IF EXISTS ${schemaName}.${storedProcedureName};\r\n`
                    + 'DELIMITER $$\r\n'
                    + `CREATE PROCEDURE IF NOT EXISTS ${schemaName}.${storedProcedureName} ()\r\n`
                    + 'BEGIN\r\n'
                    + '\tDECLARE EXIT HANDLER FOR 1068 DO 0;\r\n'
                    + `\tALTER TABLE ${schemaName}.${tableName}\r\n`
                    + `\tADD CONSTRAINT ${indexName} PRIMARY KEY (${columnString});\r\n`
                    + 'END $$\r\n'
                    + 'DELIMITER ;\r\n'
                    + `CALL ${schemaName}.${storedProcedureName};\r\n`
                    + `DROP PROCEDURE IF EXISTS ${schemaName}.${storedProcedureName};\r\n`);
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
