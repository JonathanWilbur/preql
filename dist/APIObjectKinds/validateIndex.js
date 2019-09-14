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
    obj.spec.keyAttributes
        .map((attr) => (`${obj.spec.databaseName}.${obj.spec.structName}.${attr.name}`.toLowerCase()))
        .forEach((path) => {
        if (!(path in etcd.pathIndex)) {
            throw new PreqlError_1.default("d80009c9-894d-4c0f-8871-1335e826cf16", `Attribute with path '${path}' not found for ${obj.kind} `
                + `'${obj.metadata.name}' to index.`);
        }
    });
    if (obj.spec.includedAttributes) {
        obj.spec.includedAttributes
            .map((attr) => (`${obj.spec.databaseName}.${obj.spec.structName}.${attr.name}`.toLowerCase()))
            .forEach((path) => {
            if (!(path in etcd.pathIndex)) {
                throw new PreqlError_1.default("8bcaffd3-b64c-44dc-96c6-4a6fc3dacfce", `Attribute with path '${path}' not found for ${obj.kind} `
                    + `'${obj.metadata.name}' to include.`);
            }
        });
    }
}
exports.default = validateIndex;
//# sourceMappingURL=validateIndex.js.map