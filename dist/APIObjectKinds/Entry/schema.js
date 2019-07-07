"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegex_1 = __importDefault(require("../../identifierRegex"));
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Entry Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        databaseName: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        structName: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        distinguishedName: {
            type: 'string',
            unicodePattern: '^[^#].*=.+',
        },
        values: {
            type: 'object',
            propertyNames: {
                pattern: identifierRegex_1.default,
            },
            additionalProperties: {
                type: [
                    'boolean',
                    'number',
                    'string',
                ],
            },
        },
    },
    required: [
        'databaseName',
        'structName',
    ],
};
exports.default = schema;
