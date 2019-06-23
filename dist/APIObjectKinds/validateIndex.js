"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matchingResource_1 = __importDefault(require("./matchingResource"));
async function validateIndex(apiObject, etcd) {
    if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
        throw new Error(`No Databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
            + `'${apiObject.metadata.name}' to attach to.`);
    }
    if (apiObject.spec.entityName && !matchingResource_1.default(apiObject.spec.entityName, 'entity', etcd)) {
        throw new Error(`No Entities found that are named '${apiObject.spec.entityName}' for ${apiObject.kind} `
            + `'${apiObject.metadata.name}' to be associated with.`);
    }
    if (!matchingResource_1.default(apiObject.spec.structName, 'struct', etcd)) {
        throw new Error(`No Structs found that are named '${apiObject.spec.structName}' for ${apiObject.kind} `
            + `'${apiObject.metadata.name}' to attach to.`);
    }
    const attributes = etcd.kindIndex.attribute;
    if (!attributes) {
        throw new Error(`No Attributes found for ${apiObject.kind} '${apiObject.metadata.name}' `
            + 'to index.');
    }
    // Check that the columns are real
    // eslint-disable-next-line
    apiObject.spec.keyColumns.forEach((kc) => {
        const attributeFound = attributes.some((attr) => attr.spec.name === kc.name);
        if (!attributeFound) {
            throw new Error(`No Attribute named '${kc.name}' for ${apiObject.kind} '${apiObject.metadata.name}' to index.`);
        }
    });
}
exports.default = validateIndex;
;
