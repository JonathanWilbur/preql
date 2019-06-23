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
    name: 'Struct',
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
            throw new Error(`No Databases found that are named '${apiObject.spec.databaseName}' for Struct `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (apiObject.spec.entityName && !matchingResource_1.default(apiObject.spec.entityName, 'entity', etcd)) {
            throw new Error(`No Entities found that are named '${apiObject.spec.entityName}' for Struct `
                + `'${apiObject.metadata.name}' to be associated with.`);
        }
        const attributeFound = (etcd.kindIndex.attribute || [])
            .some((attr) => (attr.spec.databaseName === apiObject.spec.databaseName
            && attr.spec.structName === apiObject.spec.name));
        if (!attributeFound) {
            throw new Error(`No attributes found for Struct '${apiObject.metadata.name}'. Every`
                + ' Struct must have at least one attribute.');
        }
    },
};
exports.default = kind;
