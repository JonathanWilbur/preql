"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
;
const jsonSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'PreQL Namespace Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        collation: {
            type: 'string',
            default: 'utf8',
            description: 'Only lowercase alphabetic and numeric characters from the acronym'
                + '/ symbol of the character encoding.',
        },
    },
    required: [],
};
const namespaceValidator = ajv.compile(jsonSchema);
const NamespaceKind = {
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
    validateSemantics: () => Promise.resolve([]),
    transpilePresenceIn: new Map([
        [
            'mariadb',
            (apiObject) => Promise.resolve(
            // TODO: Support character sets and collation.
            `CREATE DATABASE IF NOT EXISTS ${apiObject.metadata.name};`),
        ],
    ]),
    transpileAbsenceIn: new Map([
        [
            'mariadb',
            (apiObject) => Promise.resolve(`DROP DATABASE IF EXISTS ${apiObject.metadata.name};`),
        ],
    ]),
};
exports.default = NamespaceKind;
