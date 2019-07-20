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
            throw new PreqlError_1.default('76d5a336-be52-4e25-8b9e-a8ecf79c269c', `No Databases found that are named '${apiObject.spec.databaseName}' for Enum `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (apiObject.spec.characterSet && !matchingResource_1.default(apiObject.spec.characterSet, 'characterset', etcd)) {
            throw new PreqlError_1.default('c8b3ffc0-d4c0-4f63-9592-2342eb79b6d7', `No CharacterSets found that are named '${apiObject.spec.characterSet}' for Enum `
                + `'${apiObject.metadata.name}' to use.`);
        }
        if (apiObject.spec.collation && !matchingResource_1.default(apiObject.spec.collation, 'collation', etcd)) {
            throw new PreqlError_1.default('5c66efb9-ecf9-4a18-886c-e83b4a2888ba', `No Collations found that are named '${apiObject.spec.collation}' for Enum `
                + `'${apiObject.metadata.name}' to use.`);
        }
        const encounteredValues = new Set([]);
        const encounteredIndexes = new Set([]);
        apiObject.spec.values.forEach(v => {
            if (encounteredValues.has(v.value)) {
                throw new PreqlError_1.default('037c1cfe-1c72-48cb-a920-ceaf503ccdc9', `Duplicate value '${v.value}' in Enum '${apiObject.metadata.name}'.`);
            }
            encounteredValues.add(v.value);
            if (!v.index)
                return;
            if (encounteredIndexes.has(v.index)) {
                throw new PreqlError_1.default('54402b0a-b5b8-4415-8a46-217d22fd726e', `Duplicate index ${v.index} in Enum '${apiObject.metadata.name}'.`);
            }
            encounteredIndexes.add(v.index);
        });
        const datatype = (etcd.kindIndex.datatype || [])
            .find((obj) => obj.metadata.name === apiObject.spec.type);
        if (!datatype) {
            throw new PreqlError_1.default('17bd1287-2c8d-4eb6-9de5-3f35639351ad', `No DataTypes found that are named '${apiObject.spec.type}' for Enum `
                + `'${apiObject.metadata.name}' to use.`);
        }
        if (datatype.spec.jsonEquivalent !== 'string') {
            throw new PreqlError_1.default('599ee515-7b56-47e1-ad60-06cf57198113', `Enum '${apiObject.metadata.name}' cannot use type `
                + `'${apiObject.spec.type}' because it is not fundamentally string-`
                + 'like.');
        }
    },
};
exports.default = kind;
