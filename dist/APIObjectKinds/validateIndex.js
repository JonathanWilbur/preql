"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matchingResource_1 = __importDefault(require("./matchingResource"));
async function validateIndex(apiObject, etcd) {
    if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
        throw new Error(`No databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
            + `'${apiObject.metadata.name}' to attach to.`);
    }
    if (!matchingResource_1.default(apiObject.spec.structName, 'struct', etcd)) {
        throw new Error(`No structs found that are named '${apiObject.spec.structName}' for ${apiObject.kind} `
            + `'${apiObject.metadata.name}' to attach to.`);
    }
    const columns = etcd.kindIndex.attribute;
    if (!columns) {
        throw new Error(`No attributes found for ${apiObject.kind} '${apiObject.metadata.name}' `
            + 'to index.');
    }
    // Check that the columns are real
    // eslint-disable-next-line
    apiObject.spec.keyColumns.forEach((kc) => {
        const columnFound = columns.some((column) => column.spec.name === kc.name);
        if (!columnFound) {
            throw new Error(`No attribute named '${kc.name}' for ${apiObject.kind} '${apiObject.metadata.name}' to index.`);
        }
    });
}
exports.default = validateIndex;
;
