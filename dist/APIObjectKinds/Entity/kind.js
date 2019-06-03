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
    name: 'Entity',
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
            throw new Error(`No databases found that are named '${apiObject.spec.databaseName}' for Entity `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (!matchingResource_1.default(apiObject.spec.rootStruct, 'struct', etcd)) {
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
