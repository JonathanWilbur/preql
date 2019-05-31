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
    name: 'Database',
    getPath: (apiObject) => apiObject.spec.name || '',
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: () => Promise.resolve(),
    transpilePresenceIn: new Map([
        [
            'mariadb',
            // TODO: Support character sets and collation.
            (apiObject) => `CREATE DATABASE IF NOT EXISTS ${apiObject.spec.name};`,
        ],
    ]),
    transpileAbsenceIn: new Map([
        [
            'mariadb',
            (apiObject) => `DROP DATABASE IF EXISTS ${apiObject.spec.name};`,
        ],
    ]),
};
exports.default = kind;