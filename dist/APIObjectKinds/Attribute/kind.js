"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const index_1 = __importDefault(require("../../DataTypes/index"));
const ConsoleLogger_1 = __importDefault(require("../../Loggers/ConsoleLogger"));
const matchingResource_1 = __importDefault(require("../matchingResource"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(schema_1.default);
const kind = {
    name: 'Attribute',
    getPath: (apiObject) => {
        const databaseName = apiObject.spec.databaseName || '';
        const structName = apiObject.spec.structName || '';
        const attributeName = apiObject.spec.name || '';
        return `${databaseName}.${structName}.${attributeName}`;
    },
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
            throw new Error(`No databases found that are named '${apiObject.spec.databaseName}' for attribute `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (!matchingResource_1.default(apiObject.spec.structName, 'struct', etcd)) {
            throw new Error(`No structs found that are named '${apiObject.spec.structName}' for attribute `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
    },
    transpilePresenceIn: new Map([
        [
            'mariadb',
            (apiObject) => {
                let columnString = `ALTER TABLE ${apiObject.spec.databaseName}.${apiObject.spec.structName}\r\n`
                    + `ADD COLUMN IF NOT EXISTS ${apiObject.spec.name} `;
                const type = apiObject.spec.type.toLowerCase();
                if (type in index_1.default) {
                    columnString += index_1.default[type].mariadb.equivalentNativeType(apiObject.spec, ConsoleLogger_1.default);
                }
                else {
                    throw new Error(`Attribute '${apiObject.metadata.name}' has unrecognized type '${type}'.`);
                }
                if (apiObject.spec.nullable)
                    columnString += ' NULL';
                else
                    columnString += ' NOT NULL';
                // Simply quoting the default value is fine, because MariaDB will cast it.
                if (apiObject.spec.default)
                    columnString += ` DEFAULT '${apiObject.spec.default}'`;
                if (apiObject.metadata.annotations && apiObject.metadata.annotations.has('comment')) {
                    columnString += `\r\nCOMMENT '${apiObject.metadata.annotations.get('comment')}'`;
                }
                columnString += ';';
                return columnString;
            },
        ],
    ]),
    transpileAbsenceIn: new Map([
        [
            'mariadb',
            (apiObject) => 'ALTER TABLE '
                + `${apiObject.spec.databaseName}.${apiObject.spec.structName}\r\n`
                + `DROP COLUMN IF EXISTS ${apiObject.spec.name};`,
        ],
    ]),
};
exports.default = kind;
