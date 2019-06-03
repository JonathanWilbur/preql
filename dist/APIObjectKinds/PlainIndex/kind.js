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
    name: 'PlainIndex',
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: validateIndex_1.default,
    transpilePresenceIn: new Map([
        [
            'mariadb',
            (apiObject) => {
                const columnString = apiObject.spec.keyColumns
                    .map((key) => `${key.name} ${(key.ascending ? 'ASC' : 'DESC')}`)
                    .join(', ');
                return (`ALTER TABLE ${apiObject.spec.databaseName}.${apiObject.spec.structName}\r\n`
                    + `ADD INDEX IF NOT EXISTS ${apiObject.spec.name}\r\n`
                    + `PRIMARY KEY (${columnString});`);
            },
        ],
    ]),
    transpileAbsenceIn: new Map([
        [
            'mariadb',
            (apiObject) => 'ALTER TABLE '
                + `${apiObject.spec.databaseName}.${apiObject.spec.structName}\r\n`
                + `DROP INDEX IF EXISTS ${apiObject.spec.name};`,
        ],
    ]),
};
exports.default = kind;
