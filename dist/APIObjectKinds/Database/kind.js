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
ajv.addKeyword('unicodePattern', {
    // eslint-disable-next-line
    validate: (schema, data) => (typeof schema === 'string' && typeof data === 'string'
        ? (new RegExp(schema, 'u')).test(data) : false),
    async: true,
    errors: false,
});
const structureValidator = ajv.compile(schema_1.default);
const kind = {
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: () => Promise.resolve(),
};
exports.default = kind;
