"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("../../ajv"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const schema_1 = __importDefault(require("./schema"));
const structureValidator = ajv_1.default.compile(schema_1.default);
const kind = {
    validateStructure: (obj) => structureValidator(obj.spec),
    validateSemantics: async (obj, etcd) => {
        if (!(obj.spec.characterSet))
            return;
        if (!etcd.pathIndex[obj.spec.characterSet.toLowerCase()]) {
            throw new PreqlError_1.default("f191539e-7758-4a56-81ea-bba873dbfad1", `No CharacterSet found that is named '${obj.spec.characterSet}' `
                + `to be for CharacterSet for Collation '${obj.metadata.name}'.`);
        }
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map