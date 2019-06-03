"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const kind_1 = __importDefault(require("../Attribute/kind"));
const matchingResource_1 = __importDefault(require("../matchingResource"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(schema_1.default);
const kind = {
    name: 'Struct',
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
            throw new Error(`No databases found that are named '${apiObject.spec.databaseName}' for Entity `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
    },
    transpilePresenceIn: new Map([
        [
            'mariadb',
            (apiObject, etcd) => {
                const columnTranspiler = kind_1.default.transpilePresenceIn.get('mariadb');
                if (!columnTranspiler) {
                    throw new Error('Cannot transpile columns for MariaDB.');
                }
                let transpiledAttributes = [];
                const attributes = etcd.kindIndex.get('attribute');
                if (attributes) {
                    transpiledAttributes = attributes
                        .filter((attr) => {
                        if (attr.spec.databaseName === apiObject.spec.databaseName
                            && attr.spec.structName === apiObject.spec.name)
                            return true;
                        return false;
                    }).map((column) => columnTranspiler(column, etcd));
                }
                else {
                    throw new Error('Cannot define a Struct with no attributes defined.');
                }
                if (transpiledAttributes.length === 0) {
                    throw new Error(`No attributes (columns) found for struct (table) '${apiObject.metadata.name}'.`);
                }
                return 'CREATE TABLE IF NOT EXISTS '
                    + `${apiObject.spec.databaseName}.${apiObject.spec.name} (__placeholder__ BOOLEAN);\r\n\r\n`
                    + `${transpiledAttributes.join('\r\n\r\n')}\r\n\r\n`
                    + `ALTER TABLE ${apiObject.spec.databaseName}.${apiObject.spec.name} `
                    + 'DROP COLUMN IF EXISTS __placeholder__;';
            },
        ],
    ]),
    transpileAbsenceIn: new Map([
        [
            'mariadb',
            (apiObject) => `DROP TABLE IF EXISTS ${apiObject.spec.name};`,
        ],
    ]),
};
exports.default = kind;
