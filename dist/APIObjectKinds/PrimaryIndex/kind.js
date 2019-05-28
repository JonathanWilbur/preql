"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(schema_1.default);
const kind = {
    name: 'PrimaryIndex',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPath: (apiObject) => {
        const namespace = apiObject.metadata.namespace || '';
        const struct = apiObject.metadata.labels ? apiObject.metadata.labels.get('struct') || '' : '';
        const index = apiObject.metadata.name;
        return `${namespace}.${struct}.${index}`;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    // TODO: Log warnings for includedColumns, because they are not used.
    validateSemantics: async (apiObject, etcd) => {
        const labeledNamespace = apiObject.metadata.namespace;
        if (!labeledNamespace) {
            throw new Error(`No metadata.namespace defined for PrimaryIndex '${apiObject.metadata.name}'.`);
        }
        if (!(apiObject.metadata.labels)) {
            throw new Error(`PrimaryIndex '${apiObject.metadata.name}' needs labels to associate `
                + 'it to a namespace (database) and struct (table).');
        }
        const labeledStruct = apiObject.metadata.labels.get('struct');
        if (!labeledStruct) {
            throw new Error(`No metadata.namespace defined for PrimaryIndex '${apiObject.metadata.name}'.`);
        }
        // eslint-disable-next-line
        const namespaces = etcd.kindIndex.get('namespace');
        if (!namespaces) {
            throw new Error(`No namespaces defined for PrimaryIndex '${apiObject.metadata.name}' to attach to.`);
        }
        const matchingNamespaceFound = namespaces
            .some((namespace) => namespace.metadata.name === labeledNamespace);
        if (!matchingNamespaceFound) {
            throw new Error(`No namespaces found that are named '${labeledNamespace}' for PrimaryIndex `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        // eslint-disable-next-line
        const structs = etcd.kindIndex.get('struct');
        if (!structs) {
            throw new Error(`No structs defined for PrimaryIndex '${apiObject.metadata.name}' to attach to.`);
        }
        const matchingStructFound = structs
            .some((struct) => struct.metadata.name === labeledStruct);
        if (!matchingStructFound) {
            throw new Error(`No structs found that are named '${labeledStruct}' for PrimaryIndex `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        // eslint-disable-next-line
        const columns = etcd.kindIndex.get('attribute');
        if (!columns) {
            throw new Error(`No attributes found for PrimaryIndex '${apiObject.metadata.name}' `
                + 'to index.');
        }
        // Check that the columns are real
        apiObject.spec.keyColumns.forEach((kc) => {
            const columnFound = columns.some((column) => column.metadata.name === kc.name);
            if (!columnFound) {
                throw new Error(`No attribute named '${kc.name}' for PrimaryIndex '${apiObject.metadata.name}' to index.`);
            }
        });
    },
    transpilePresenceIn: new Map([
        [
            'mariadb',
            // eslint-disable-next-line
            (apiObject) => {
                if (!apiObject.metadata.labels) {
                    throw new Error(`PrimaryIndex '${apiObject.metadata.name}' needs labels to associate `
                        + 'it to a namespace (database) and struct (table).');
                }
                const schemaName = apiObject.metadata.namespace;
                const tableName = apiObject.metadata.labels.get('struct');
                const indexName = apiObject.metadata.name;
                const storedProcedureName = `create_index_${indexName}`;
                const columnString = apiObject.spec.keyColumns
                    .map((key) => `${key.name} ${(key.ascending ? 'ASC' : 'DESC')}`)
                    .join(', ');
                return (`DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
                    + 'DELIMITER $$\r\n'
                    + `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n`
                    + 'BEGIN\r\n'
                    + '\tDECLARE EXIT HANDLER FOR 1068 DO 0;\r\n'
                    + `\tALTER TABLE ${schemaName}.${tableName}\r\n`
                    + `\tADD CONSTRAINT ${indexName} PRIMARY KEY (${columnString});\r\n`
                    + 'END $$\r\n'
                    + 'DELIMITER ;\r\n'
                    + `CALL ${storedProcedureName};\r\n`
                    + `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`);
            },
        ],
    ]),
    transpileAbsenceIn: new Map([
        [
            'mariadb',
            // eslint-disable-next-line
            (apiObject) => {
                const schemaName = apiObject.metadata.namespace;
                const tableName = apiObject.metadata.name;
                return `ALTER TABLE ${schemaName}.${tableName} DROP PRIMARY KEY;\r\n\r\n`;
            },
        ],
    ]),
};
exports.default = kind;
