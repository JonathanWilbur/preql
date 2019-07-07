"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matchingResource_1 = __importDefault(require("./matchingResource"));
const PreqlError_1 = __importDefault(require("../PreqlError"));
async function validateIndex(apiObject, etcd) {
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
        throw new PreqlError_1.default('fbee0ffc-6969-4548-bd8d-72a5c189e0e6', `No Attributes found for ${apiObject.kind} '${apiObject.metadata.name}' `
            + 'to index.');
    }
    // Check that the columns are real
    // eslint-disable-next-line
    apiObject.spec.keyAttributes.forEach((kc) => {
        const attributeFound = attributes.some((attr) => attr.spec.name === kc.name);
        if (!attributeFound) {
            throw new Error(`No Attribute named '${kc.name}' for ${apiObject.kind} '${apiObject.metadata.name}' to index.`);
        }
    });
}
exports.default = validateIndex;
;
