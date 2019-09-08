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
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        // Validate CharacterSet
        if (apiObject.spec.characterSet && !etcd.pathIndex[apiObject.spec.characterSet.toLowerCase()]) {
            throw new PreqlError_1.default('5f9536b1-4802-4324-aedc-6ad4a59d405d', `No CharacterSets found that are named '${apiObject.spec.characterSet}' for Server `
                + `'${apiObject.metadata.name}' to use.`);
        }
        // Validate Collation
        if (apiObject.spec.collation && !etcd.pathIndex[apiObject.spec.collation.toLowerCase()]) {
            throw new PreqlError_1.default('7b8ab323-1e2b-4bf6-81c1-619b3a523b58', `No Collations found that are named '${apiObject.spec.collation}' for Server `
                + `'${apiObject.metadata.name}' to use.`);
        }
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map