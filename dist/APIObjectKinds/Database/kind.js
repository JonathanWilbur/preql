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
            throw new PreqlError_1.default('e4d5bf3b-1063-42dd-8ce6-15e6f98fbb5f', `No CharacterSets found that are named '${apiObject.spec.characterSet}' for Database `
                + `'${apiObject.metadata.name}' to use.`);
        }
        // Validate Collation
        if (apiObject.spec.collation && !etcd.pathIndex[apiObject.spec.collation.toLowerCase()]) {
            throw new PreqlError_1.default('a3cc2f42-099f-43ee-be57-c8d2aa842712', `No Collations found that are named '${apiObject.spec.collation}' for Database `
                + `'${apiObject.metadata.name}' to use.`);
        }
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map