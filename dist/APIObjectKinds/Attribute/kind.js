"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const matchingResource_1 = __importDefault(require("../matchingResource"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(schema_1.default);
const kind = {
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
            throw new PreqlError_1.default('58f2e994-a54a-48e2-8d53-d7015f934beb', `No Databases found that are named '${apiObject.spec.databaseName}' for Attribute `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (apiObject.spec.entityName && !matchingResource_1.default(apiObject.spec.entityName, 'entity', etcd)) {
            throw new PreqlError_1.default('d5b8e0a0-5e69-44bc-8c93-d238c4b3f133', `No Entities found that are named '${apiObject.spec.entityName}' for Attribute `
                + `'${apiObject.metadata.name}' to be associated with.`);
        }
        if (!matchingResource_1.default(apiObject.spec.structName, 'struct', etcd)) {
            throw new PreqlError_1.default('1d985193-ce84-4051-a0cc-af9984094d4f', `No Structs found that are named '${apiObject.spec.structName}' for Attribute `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
    },
};
exports.default = kind;
