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
    name: 'Postamble',
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: Promise.resolve,
    transpilePresenceIn: new Map([
        [
            'mariadb',
            (apiObject) => `-- ${apiObject.spec.uncommentedText.replace(/\r?\n/, '\r\n-- ')}`,
        ],
    ]),
    transpileAbsenceIn: new Map([]),
};
exports.default = kind;
