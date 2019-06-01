"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(schema_1.default);
const kind = {
    name: 'DataType',
    getPath: (apiObject) => apiObject.metadata.name,
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async () => {
        // TODO: Validate regexes.
        // TODO: Throw if regexes and non-string type.
        // TODO: Ensure every target has either return or returnBasedOnLength
    },
    transpilePresenceIn: new Map([]),
    transpileAbsenceIn: new Map([]),
};
exports.default = kind;
