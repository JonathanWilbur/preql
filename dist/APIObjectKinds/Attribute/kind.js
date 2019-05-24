"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const index_1 = __importDefault(require("../../DataTypes/index"));
const ConsoleLogger_1 = __importDefault(require("../../Loggers/ConsoleLogger"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const attributeValidator = ajv.compile(schema_1.default);
const kind = {
    name: 'Attribute',
    // eslint-disable-next-line
    validateStructure: (apiObject) => {
        return new Promise((resolve, reject) => {
            const valid = attributeValidator(apiObject.spec);
            if (valid) {
                resolve([]);
            }
            else {
                reject(new Error((attributeValidator.errors || []).map(e => e.message).join('; ')));
            }
        });
    },
    validateSemantics: async (apiObject, etcd) => {
        const labeledNamespace = apiObject.metadata.namespace;
        if (!labeledNamespace) {
            throw new Error(`No metadata.namespace defined for Attribute '${apiObject.metadata.name}'.`);
        }
        if (!(apiObject.metadata.labels)) {
            throw new Error(`Attribute '${apiObject.metadata.name}' needs labels to associate `
                + 'it to a namespace (database) and struct (table).');
        }
        const labeledStruct = apiObject.metadata.labels.get('struct');
        if (!labeledStruct) {
            throw new Error(`No metadata.namespace defined for Attribute '${apiObject.metadata.name}'.`);
        }
        // eslint-disable-next-line
        const namespaces = etcd.present.get('namespace');
        if (!namespaces) {
            throw new Error(`No namespaces defined for attribute '${apiObject.metadata.name}' to attach to.`);
        }
        const matchingNamespaceFound = namespaces
            .some((namespace) => namespace.metadata.name === labeledNamespace);
        if (!matchingNamespaceFound) {
            throw new Error(`No namespaces found that are named '${labeledNamespace}' for attribute `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        // eslint-disable-next-line
        const structs = etcd.present.get('struct');
        if (!namespaces) {
            throw new Error(`No structs defined for attribute '${apiObject.metadata.name}' to attach to.`);
        }
        const matchingStructFound = namespaces
            .some((struct) => struct.metadata.name === labeledStruct);
        if (!matchingStructFound) {
            throw new Error(`No structs found that are named '${labeledStruct}' for attribute `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
    },
    transpilePresenceIn: new Map([
        [
            'mariadb',
            (apiObject) => {
                const schemaName = apiObject.metadata.namespace;
                if (!(apiObject.metadata.labels)) {
                    throw new Error(`Attribute '${apiObject.metadata.name}' needs labels to associate `
                        + 'it to a namespace (database) and struct (table).');
                }
                const tableName = apiObject.metadata.labels.get('struct');
                const columnName = apiObject.metadata.name;
                let columnString = `ALTER TABLE ${schemaName}.${tableName}\r\nADD COLUMN IF NOT EXISTS ${columnName} `;
                // columnString += convertPreqlTypeToNativeType(path, spec);
                const type = apiObject.spec.type.toLowerCase();
                const path = [
                    schemaName || '',
                    tableName || '',
                    columnName,
                ];
                if (type in index_1.default) {
                    columnString += index_1.default[type].mariadb.equivalentNativeType(path, apiObject.spec, ConsoleLogger_1.default);
                }
                else {
                    throw new Error(`${path}: Unrecognized type: ${type}`);
                }
                if (apiObject.spec.nullable)
                    columnString += ' NULL';
                else
                    columnString += ' NOT NULL';
                // Simply quoting the default value is fine, because MySQL will cast it.
                if (apiObject.spec.default)
                    columnString += ` DEFAULT '${apiObject.spec.default}'`;
                if (apiObject.metadata.annotations && apiObject.metadata.annotations.has('comment')) {
                    columnString += `\r\nCOMMENT '${apiObject.metadata.annotations.get('comment')}'`;
                }
                columnString += ';';
                // logger.debug(path, 'Transpiled.');
                return columnString;
            },
        ],
    ]),
    transpileAbsenceIn: new Map([
        [
            'mariadb',
            // eslint-disable-next-line
            (apiObject) => '',
        ],
    ]),
};
exports.default = kind;
