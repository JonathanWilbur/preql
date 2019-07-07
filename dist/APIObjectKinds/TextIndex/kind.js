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
            throw new PreqlError_1.default('37caf6cd-29d8-45ef-8697-f73ce1ee23ae', `No Databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (apiObject.spec.entityName && !matchingResource_1.default(apiObject.spec.entityName, 'entity', etcd)) {
            throw new PreqlError_1.default('8f3b2610-3308-4b65-b180-ead4f452c9c1', `No Entities found that are named '${apiObject.spec.entityName}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to be associated with.`);
        }
        if (!matchingResource_1.default(apiObject.spec.structName, 'struct', etcd)) {
            throw new PreqlError_1.default('bc7692ff-9eb1-4258-b9ac-d95b1448153f', `No Structs found that are named '${apiObject.spec.structName}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        const attributes = etcd.kindIndex.attribute;
        if (!attributes) {
            throw new PreqlError_1.default('fbee0ffc-6969-4548-bd8d-72a5c189e0e6', `No Attributes found for ${apiObject.kind} '${apiObject.metadata.name}' to index.`);
        }
        // Check that the columns are real and of string-ish type
        // eslint-disable-next-line
        apiObject.spec.keyAttributes.forEach((kc) => {
            const attribute = attributes
                .find((attr) => attr.spec.name === kc.name);
            if (!attribute) {
                throw new Error(`No Attribute named '${kc.name}' for ${apiObject.kind} '${apiObject.metadata.name}' to index.`);
            }
            const kindAndName = `datatype:${attribute.spec.type.toLowerCase()}`;
            const dataType = etcd.kindNameIndex[kindAndName];
            if (!dataType) {
                throw new PreqlError_1.default('06fc9208-5772-47d6-8747-dffa6ac58d42', `No such DataType '${attribute.spec.type}'.`);
            }
            if (dataType.spec.jsonEquivalent !== 'string') {
                throw new PreqlError_1.default('8ab69478-d407-4a60-95ce-d3dd248cc5ce', `TextIndex '${apiObject.metadata.name}' cannot use Attribute `
                    + `'${attribute.metadata.name}' because it DataType `
                    + `'${dataType.metadata.name}' is not fundamentally string-like, `
                    + "as determined by the DataType's `jsonEquivalent` property.");
            }
        });
    },
};
exports.default = kind;
