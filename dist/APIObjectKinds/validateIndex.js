"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PreqlError_1 = __importDefault(require("../PreqlError"));
/**
 * Since all of the index object kinds are so similar, this semantic validation
 * has been deduplicated into this function. This function validates that an
 * index-like API object is semantically valid.
 *
 * @param obj {APIObject} The object to be validated.
 * @param etcd {APIObjectDatabase} The database of objects against which to validate the object.
 * @returns {Promise} A `Promise` that resolves if it is valid, or rejects if not.
 */
async function validateIndex(obj, etcd) {
    const databasePath = obj.spec.databaseName.toLowerCase();
    const entityPath = `${obj.spec.databaseName}.$${obj.spec.entityName}`.toLowerCase();
    const structPath = [obj.spec.databaseName, obj.spec.structName].join(".").toLowerCase();
    if (!etcd.pathIndex[databasePath]) {
        throw new PreqlError_1.default("37caf6cd-29d8-45ef-8697-f73ce1ee23ae", `No Databases found that are named '${obj.spec.databaseName}' for ${obj.kind} `
            + `'${obj.metadata.name}' to attach to.`);
    }
    if (obj.spec.entityName && !etcd.pathIndex[entityPath]) {
        throw new PreqlError_1.default("8f3b2610-3308-4b65-b180-ead4f452c9c1", `No Entities found that are named '${obj.spec.entityName}' for ${obj.kind} `
            + `'${obj.metadata.name}' to be associated with.`);
    }
    if (!etcd.pathIndex[structPath]) {
        throw new PreqlError_1.default("bc7692ff-9eb1-4258-b9ac-d95b1448153f", `No Structs found that are named '${obj.spec.structName}' for ${obj.kind} `
            + `'${obj.metadata.name}' to attach to.`);
    }
    const attributes = etcd.kindIndex.attribute;
    if (!attributes) {
        throw new PreqlError_1.default("fbee0ffc-6969-4548-bd8d-72a5c189e0e6", `No Attributes found for ${obj.kind} '${obj.metadata.name}' `
            + "to index.");
    }
    // Check that the attributes are real
    // eslint-disable-next-line
    obj.spec.keyAttributes.forEach((kc) => {
        const attributeFound = attributes.some((attr) => attr.spec.name === kc.name);
        if (!attributeFound) {
            throw new Error(`No Attribute named '${kc.name}' for ${obj.kind} '${obj.metadata.name}' to index.`);
        }
    });
}
exports.default = validateIndex;
//# sourceMappingURL=validateIndex.js.map