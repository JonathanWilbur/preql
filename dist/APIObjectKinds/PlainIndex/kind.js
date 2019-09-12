"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("../../ajv"));
const validateIndex_1 = __importDefault(require("../validateIndex"));
const schema_1 = __importDefault(require("./schema"));
const structureValidator = ajv_1.default.compile(schema_1.default);
/**
 * Represents a pre-sorting of data on the basis of selected `Attribute`s in a
 * DBMS to speed up queries.
 */
const kind = {
    validateStructure: (obj) => structureValidator(obj.spec),
    validateSemantics: validateIndex_1.default,
};
exports.default = kind;
//# sourceMappingURL=kind.js.map