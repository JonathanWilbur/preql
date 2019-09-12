"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("../../ajv"));
const schema_1 = __importDefault(require("./schema"));
const structureValidator = ajv_1.default.compile(schema_1.default);
/**
 * Arbitrary, commented-out text at the end of a generated script.
 */
const kind = {
    validateStructure: (obj) => structureValidator(obj.spec),
    validateSemantics: () => Promise.resolve(),
};
exports.default = kind;
//# sourceMappingURL=kind.js.map