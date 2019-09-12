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
 * Represents a virtually isolated, but not necessarily physically isolated,
 * store of data that exists within a DBMS. Such stores of data are may have
 * constraints between objects, such as `Attribute`s or `Struct`s within them,
 * but are generally independent of other such objects in other databases.
 *
 * In relational databases, these are sometimes called "schema."
 */
const kind = {
    validateStructure: (obj) => structureValidator(obj.spec),
    validateSemantics: async (obj, etcd) => {
        // Validate CharacterSet
        if (obj.spec.characterSet && !etcd.pathIndex[obj.spec.characterSet.toLowerCase()]) {
            throw new PreqlError_1.default("e4d5bf3b-1063-42dd-8ce6-15e6f98fbb5f", `No CharacterSets found that are named '${obj.spec.characterSet}' for Database `
                + `'${obj.metadata.name}' to use.`);
        }
        // Validate Collation
        if (obj.spec.collation && !etcd.pathIndex[obj.spec.collation.toLowerCase()]) {
            throw new PreqlError_1.default("a3cc2f42-099f-43ee-be57-c8d2aa842712", `No Collations found that are named '${obj.spec.collation}' for Database `
                + `'${obj.metadata.name}' to use.`);
        }
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map