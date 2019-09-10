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
 * Represents a specific way of encoding characters into bytes.
 *
 * This kind exists because different DBMSs have different names for the same
 * character sets. This kind maps an arbitrarily-named character set to its
 * real equivalents in the targeted DBMS language.
 */
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