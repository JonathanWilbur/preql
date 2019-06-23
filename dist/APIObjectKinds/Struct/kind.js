"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const matchingResource_1 = __importDefault(require("../matchingResource"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const ajv_1 = __importDefault(require("../../ajv"));
const structureValidator = ajv_1.default.compile(schema_1.default);
const kind = {
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
            throw new PreqlError_1.default('3d98139e-db3d-42de-83a7-1ef389c6ed2c', `No Databases found that are named '${apiObject.spec.databaseName}' for Struct `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (apiObject.spec.entityName && !matchingResource_1.default(apiObject.spec.entityName, 'entity', etcd)) {
            throw new PreqlError_1.default('6fe4e182-ef83-48a4-a282-2a418009174c', `No Entities found that are named '${apiObject.spec.entityName}' for Struct `
                + `'${apiObject.metadata.name}' to be associated with.`);
        }
        const attributeFound = (etcd.kindIndex.attribute || [])
            .some((attr) => (attr.spec.databaseName === apiObject.spec.databaseName
            && attr.spec.structName === apiObject.spec.name));
        if (!attributeFound) {
            throw new PreqlError_1.default('2affcfab-2f7b-46be-84cf-4797dc8be7a6', `No Attributes found for Struct '${apiObject.metadata.name}'. Every`
                + ' Struct must have at least one Attribute.');
        }
    },
};
exports.default = kind;
