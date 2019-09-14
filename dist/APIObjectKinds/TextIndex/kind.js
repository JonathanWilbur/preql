"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("../../ajv"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const schema_1 = __importDefault(require("./schema"));
const structureValidator = ajv_1.default.compile(schema_1.default);
/**
 * Represents a pre-sorting of data on the basis of selected textual
 * `Attribute`s in a DBMS on the basis of the words or phrases they contain
 * to speed up queries.
 */
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
        obj.spec.keyAttributes
            .map((attr) => (`${obj.spec.databaseName}.${obj.spec.structName}.${attr.name}`.toLowerCase()))
            .forEach((path) => {
            const attr = etcd.pathIndex[path];
            if (!attr) {
                throw new PreqlError_1.default("d80009c9-894d-4c0f-8871-1335e826cf16", `Attribute with path '${path}' not found for ${obj.kind} `
                    + `'${obj.metadata.name}' to index.`);
            }
            const kindAndName = `datatype:${attr.spec.type.toLowerCase()}`;
            const dataType = etcd.kindNameIndex[kindAndName];
            if (!dataType) {
                throw new PreqlError_1.default("06fc9208-5772-47d6-8747-dffa6ac58d42", `No such DataType '${attr.spec.type}'.`);
            }
            if (dataType.spec.jsonEquivalent !== "string") {
                throw new PreqlError_1.default("8ab69478-d407-4a60-95ce-d3dd248cc5ce", `TextIndex '${obj.metadata.name}' cannot use Attribute `
                    + `'${attr.metadata.name}' because it DataType `
                    + `'${dataType.metadata.name}' is not fundamentally string-like, `
                    + "as determined by the DataType's `jsonEquivalent` property.");
            }
        });
        if (obj.spec.includedAttributes) {
            obj.spec.includedAttributes
                .map((attr) => (`${obj.spec.databaseName}.${obj.spec.structName}.${attr.name}`.toLowerCase()))
                .forEach((path) => {
                const attr = etcd.pathIndex[path];
                if (!attr) {
                    throw new PreqlError_1.default("e1b74181-e619-459f-850b-28731f243610", `Attribute with path '${path}' not found for ${obj.kind} `
                        + `'${obj.metadata.name}' to include.`);
                }
                const kindAndName = `datatype:${attr.spec.type.toLowerCase()}`;
                const dataType = etcd.kindNameIndex[kindAndName];
                if (!dataType) {
                    throw new PreqlError_1.default("d8f0c648-fbb0-4d3e-8df2-e017f7d2a1ee", `No such DataType '${attr.spec.type}'.`);
                }
                if (dataType.spec.jsonEquivalent !== "string") {
                    throw new PreqlError_1.default("a40a63ba-547e-4caa-98cb-2f6b2bfff20d", `TextIndex '${obj.metadata.name}' cannot use Attribute `
                        + `'${attr.metadata.name}' because it DataType `
                        + `'${dataType.metadata.name}' is not fundamentally string-like, `
                        + "as determined by the DataType's `jsonEquivalent` property.");
                }
            });
        }
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map