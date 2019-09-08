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
        if (!(apiObject.spec.characterSet))
            return;
        if (!etcd.pathIndex[apiObject.spec.characterSet.toLowerCase()]) {
            throw new PreqlError_1.default('f191539e-7758-4a56-81ea-bba873dbfad1', `No CharacterSet found that is named '${apiObject.spec.characterSet}' `
                + `to be for CharacterSet for Collation '${apiObject.metadata.name}'.`);
        }
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map