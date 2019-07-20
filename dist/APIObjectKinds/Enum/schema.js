"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegexString_1 = __importDefault(require("../../identifierRegexString"));
const objectIdentifierRegexString_1 = __importDefault(require("../../objectIdentifierRegexString"));
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Enum Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        databaseName: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        type: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        length: {
            type: 'integer',
            minimum: 1,
        },
        objectIdentifier: {
            type: 'string',
            pattern: objectIdentifierRegexString_1.default,
        },
        characterSet: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        collation: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        values: {
            type: 'array',
            items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    value: {
                        type: 'string',
                        minLength: 1,
                    },
                    index: {
                        number: 'string',
                        minimum: 0,
                    },
                },
                required: [
                    'value',
                ],
            },
            minItems: 1,
            maxItems: 255,
            uniqueItems: true,
        },
    },
    required: [
        'name',
        // 'entityName',
        'databaseName',
        'type',
        'values',
    ],
};
exports.default = schema;
