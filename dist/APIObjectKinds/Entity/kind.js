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
    name: 'Entity',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPath: (apiObject) => {
        const databaseName = apiObject.spec.databaseName || '';
        const entityName = apiObject.spec.name || '';
        return `${databaseName}.${entityName}`;
    },
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        const databases = etcd.kindIndex.get('database');
        if (!databases) {
            throw new Error(`No databases defined for Entity '${apiObject.metadata.name}' to attach to.`);
        }
        const matchingDatabaseFound = databases
            .some((database) => database.spec.name === apiObject.spec.databaseName);
        if (!matchingDatabaseFound) {
            throw new Error(`No databases found that are named '${apiObject.spec.databaseName}' for Entity `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        const structs = etcd.kindIndex.get('struct');
        if (!structs) {
            throw new Error(`No structs defined for Entity '${apiObject.metadata.name}' to attach to.`);
        }
        const matchingStructsFound = structs
            .some((struct) => apiObject.spec.rootStruct === struct.metadata.name);
        if (!matchingStructsFound) {
            throw new Error(`No structs found that are named '${apiObject.spec.rootStruct}' for Entity `
                + `'${apiObject.metadata.name}' to use as the root struct.`);
        }
    },
    transpilePresenceIn: new Map([
        [
            'mariadb',
            () => '',
        ],
    ]),
    transpileAbsenceIn: new Map([
        [
            'mariadb',
            () => '',
        ],
    ]),
};
exports.default = kind;
