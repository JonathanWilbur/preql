"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const validateIndex_1 = __importDefault(require("../validateIndex"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(schema_1.default);
const kind = {
    name: 'UniqueIndex',
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: validateIndex_1.default,
};
exports.default = kind;
