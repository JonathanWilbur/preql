"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegex_1 = __importDefault(require("../../identifierRegex"));
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Struct Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        entityName: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        databaseName: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
    },
    required: [
        'name',
        // 'entityName',
        'databaseName',
    ],
};
exports.default = schema;
