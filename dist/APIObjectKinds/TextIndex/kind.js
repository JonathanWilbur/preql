"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const ajv_1 = __importDefault(require("../../ajv"));
const structureValidator = ajv_1.default.compile(schema_1.default);
const kind = {
    validateStructure: (obj) => structureValidator(obj.spec),
    validateSemantics: async (obj, etcd) => {
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
            throw new PreqlError_1.default("fbee0ffc-6969-4548-bd8d-72a5c189e0e6", `No Attributes found for ${obj.kind} '${obj.metadata.name}' to index.`);
        }
        // Check that the attributes are real and of string-ish type
        // eslint-disable-next-line
        obj.spec.keyAttributes.forEach((kc) => {
            const attribute = attributes
                .find((attr) => attr.spec.name === kc.name);
            if (!attribute) {
                throw new PreqlError_1.default("9a72cd18-9b32-4f4e-806f-dd9ba85e02c8", `No Attribute named '${kc.name}' for ${obj.kind} `
                    + `'${obj.metadata.name}' to index.`);
            }
            const kindAndName = `datatype:${attribute.spec.type.toLowerCase()}`;
            const dataType = etcd.kindNameIndex[kindAndName];
            if (!dataType) {
                throw new PreqlError_1.default("06fc9208-5772-47d6-8747-dffa6ac58d42", `No such DataType '${attribute.spec.type}'.`);
            }
            if (dataType.spec.jsonEquivalent !== "string") {
                throw new PreqlError_1.default("8ab69478-d407-4a60-95ce-d3dd248cc5ce", `TextIndex '${obj.metadata.name}' cannot use Attribute `
                    + `'${attribute.metadata.name}' because it DataType `
                    + `'${dataType.metadata.name}' is not fundamentally string-like, `
                    + "as determined by the DataType's `jsonEquivalent` property.");
            }
        });
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map