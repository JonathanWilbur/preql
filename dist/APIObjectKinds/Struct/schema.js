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
    title: 'PreQL Struct Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        entityName: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        databaseName: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        characterSet: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        collation: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        objectIdentifier: {
            type: 'string',
            pattern: objectIdentifierRegexString_1.default,
        },
    },
    required: [
        'name',
        // 'entityName',
        'databaseName',
    ],
};
exports.default = schema;
