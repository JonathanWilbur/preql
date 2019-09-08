"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const ajv_1 = __importDefault(require("../../ajv"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const structureValidator = ajv_1.default.compile(schema_1.default);
const kind = {
    validateStructure: (obj) => structureValidator(obj.spec),
    validateSemantics: async (obj, etcd) => {
        // Validate CharacterSet
        if (obj.spec.characterSet && !etcd.pathIndex[obj.spec.characterSet.toLowerCase()]) {
            throw new PreqlError_1.default('5f9536b1-4802-4324-aedc-6ad4a59d405d', `No CharacterSets found that are named '${obj.spec.characterSet}' for Server `
                + `'${obj.metadata.name}' to use.`);
        }
        // Validate Collation
        if (obj.spec.collation && !etcd.pathIndex[obj.spec.collation.toLowerCase()]) {
            throw new PreqlError_1.default('7b8ab323-1e2b-4bf6-81c1-619b3a523b58', `No Collations found that are named '${obj.spec.collation}' for Server `
                + `'${obj.metadata.name}' to use.`);
        }
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map