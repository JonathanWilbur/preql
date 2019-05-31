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
    name: 'Server',
    getPath: () => '',
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: Promise.resolve,
    transpilePresenceIn: new Map([]),
    transpileAbsenceIn: new Map([]),
};
exports.default = kind;
