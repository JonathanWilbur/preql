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
        if (!(obj.spec.defaultCollation))
            return;
        if (!etcd.pathIndex[obj.spec.defaultCollation.toLowerCase()]) {
            throw new PreqlError_1.default("359299a4-d4f3-45c2-a4e0-e4d9064d3c76", `No Collations found that are named '${obj.spec.defaultCollation}' `
                + `to be the default collation for CharacterSet '${obj.metadata.name}'.`);
        }
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map