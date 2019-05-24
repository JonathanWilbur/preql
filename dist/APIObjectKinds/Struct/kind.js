"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const kind_1 = __importDefault(require("../Attribute/kind"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structValidator = ajv.compile(schema_1.default);
const kind = {
    name: 'Struct',
    // eslint-disable-next-line
    validateStructure: (apiObject) => {
        return new Promise((resolve, reject) => {
            const valid = structValidator(apiObject.spec);
            if (valid) {
                resolve([]);
            }
            else {
                reject(new Error((structValidator.errors || []).map(e => e.message).join('; ')));
            }
        });
    },
    validateSemantics: async (apiObject, etcd) => {
        const labelNamespace = apiObject.metadata.namespace;
        if (!labelNamespace) {
            throw new Error(`No metadata.namespace defined for Entity '${apiObject.metadata.name}'.`);
        }
        // eslint-disable-next-line
        const namespaces = etcd.present.get('namespace');
        if (!namespaces) {
            throw new Error(`No namespaces defined for Struct '${apiObject.metadata.name}' to attach to.`);
        }
        const matchingNamespaceFound = namespaces
            .some((namespace) => namespace.metadata.name === labelNamespace);
        if (!matchingNamespaceFound) {
            throw new Error(`No namespaces found that are named '${labelNamespace}' for Entity `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
    },
    transpilePresenceIn: new Map([
        [
            'mariadb',
            // eslint-disable-next-line
            (apiObject, etcd) => {
                const columnTranspiler = kind_1.default.transpilePresenceIn.get('mariadb');
                if (!columnTranspiler) {
                    throw new Error('Cannot transpile columns for MariaDB.');
                }
                let transpiledAttributes = [];
                const attributes = etcd.present.get('attribute');
                if (attributes) {
                    transpiledAttributes = attributes
                        .filter((attr) => {
                        if (!attr.metadata.namespace)
                            return false;
                        if (!attr.metadata.labels)
                            return false;
                        const databaseName = attr.metadata.namespace;
                        const tableName = attr.metadata.labels.get('struct');
                        if (databaseName === apiObject.metadata.namespace && tableName === apiObject.metadata.name)
                            return true;
                        return false;
                    }).map((column) => columnTranspiler(column, etcd));
                }
                if (transpiledAttributes.length === 0) {
                    throw new Error(`No attributes (columns) found for struct (table) '${apiObject.metadata.name}'.`);
                }
                return 'CREATE TABLE IF NOT EXISTS '
                    + `${apiObject.metadata.namespace}.${apiObject.metadata.name} (__placeholder__ BOOLEAN);\r\n\r\n`
                    + `${transpiledAttributes.join('\r\n\r\n')}\r\n\r\n`
                    + `ALTER TABLE ${apiObject.metadata.name} DROP COLUMN IF EXISTS __placeholder__;\r\n\r\n`;
            },
        ],
    ]),
    transpileAbsenceIn: new Map([
        [
            'mariadb',
            // eslint-disable-next-line
            (apiObject) => `DROP TABLE IF EXISTS ${apiObject.metadata.name};\r\n\r\n`,
        ],
    ]),
};
exports.default = kind;
