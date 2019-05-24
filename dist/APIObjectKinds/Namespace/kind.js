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
const namespaceValidator = ajv.compile(schema_1.default);
const kind = {
    name: 'Namespace',
    // eslint-disable-next-line
    validateStructure: (apiObject) => {
        return new Promise((resolve, reject) => {
            const valid = namespaceValidator(apiObject.spec);
            if (valid) {
                resolve([]);
            }
            else {
                reject(new Error((namespaceValidator.errors || []).map(e => e.message).join('; ')));
            }
        });
    },
    validateSemantics: () => Promise.resolve(),
    transpilePresenceIn: new Map([
        [
            'mariadb',
            // TODO: Support character sets and collation.
            (apiObject) => `CREATE DATABASE IF NOT EXISTS ${apiObject.metadata.name};`,
        ],
    ]),
    transpileAbsenceIn: new Map([
        [
            'mariadb',
            (apiObject) => `DROP DATABASE IF EXISTS ${apiObject.metadata.name};`,
        ],
    ]),
};
exports.default = kind;
