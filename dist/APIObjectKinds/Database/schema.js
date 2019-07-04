"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegex_1 = __importDefault(require("../../identifierRegex"));
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Database Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        characterSet: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        collation: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        serverName: {
            type: 'string',
            unicodePattern: '^(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.)*(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.?)$',
        },
    },
    required: [
        'name',
    ],
};
exports.default = schema;
