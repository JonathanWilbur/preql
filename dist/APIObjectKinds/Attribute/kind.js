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
        const databases = etcd.kindIndex.get('database');
        if (!databases) {
            throw new Error(`No databases defined for attribute '${apiObject.metadata.name}' to attach to.`);
        }
        const matchingDatabaseFound = databases
            .some((database) => database.spec.name === apiObject.spec.databaseName);
        if (!matchingDatabaseFound) {
            throw new Error(`No databases found that are named '${apiObject.spec.databaseName}' for attribute `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        const structs = etcd.kindIndex.get('struct');
        if (!structs) {
            throw new Error(`No structs defined for attribute '${apiObject.metadata.name}' to attach to.`);
        }
        const matchingStructFound = structs
            .some((struct) => struct.spec.name === apiObject.spec.structName);
        if (!matchingStructFound) {
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
                // columnString += convertPreqlTypeToNativeType(path, spec);
                const type = apiObject.spec.type.toLowerCase();
                const path = [
                    apiObject.spec.databaseName,
                    apiObject.spec.structName,
                    apiObject.spec.name,
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
            (apiObject) => 'ALTER TABLE '
                + `${apiObject.spec.databaseName}.${apiObject.spec.structName}\r\n`
                + `DROP COLUMN IF EXISTS ${apiObject.spec.name};`,
        ],
    ]),
};
exports.default = kind;
