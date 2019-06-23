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
    // This differs from validateIndex in requiring all key columns to not be null.
    validateSemantics: async (apiObject, etcd) => {
        if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
            throw new PreqlError_1.default('a67d4ef8-7f69-4079-a4a5-8ab3db6dde00', `No Databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (apiObject.spec.entityName && !matchingResource_1.default(apiObject.spec.entityName, 'entity', etcd)) {
            throw new PreqlError_1.default('ed2c6aa5-2a18-4d58-ae20-a05cc31b9236', `No Entities found that are named '${apiObject.spec.entityName}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to be associated with.`);
        }
        if (!matchingResource_1.default(apiObject.spec.structName, 'struct', etcd)) {
            throw new PreqlError_1.default('7b277f08-b6ae-4621-9cfb-7f3307099309', `No Structs found that are named '${apiObject.spec.structName}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        const attributes = etcd.kindIndex.attribute;
        if (!attributes) {
            throw new PreqlError_1.default('b5bbdd1a-cbac-401f-8a86-d5c8eb0c350e', `No Attributes found for ${apiObject.kind} '${apiObject.metadata.name}' `
                + 'to index.');
        }
        // Check that the columns are real
        // eslint-disable-next-line
        apiObject.spec.keyColumns.forEach((kc) => {
            const attributeFound = attributes
                .find((attr) => attr.spec.name === kc.name);
            if (!attributeFound) {
                throw new PreqlError_1.default('5f7cdf95-7511-47ff-a89b-af1d614a771a', `No Attribute named '${kc.name}' for ${apiObject.kind} '${apiObject.metadata.name}' to index.`);
            }
            if (attributeFound.spec.nullable) {
                throw new PreqlError_1.default('a2a20acc-e3b7-4e94-8a6b-00d3f01756ea', `Nullable Attribute '${kc.name}' may not be used in ${apiObject.kind} '${apiObject.metadata.name}'.`);
            }
        });
    },
};
exports.default = kind;
