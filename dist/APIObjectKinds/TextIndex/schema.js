"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegex_1 = __importDefault(require("../../identifierRegex"));
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Text Index Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        structName: {
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
        // eslint-disable-next-line
        // See: https://docs.microsoft.com/en-us/sql/relational-databases/indexes/clustered-and-nonclustered-indexes-described?view=sql-server-2017
        clustered: {
            type: 'boolean',
            default: false,
        },
        // eslint-disable-next-line
        // See: https://docs.microsoft.com/en-us/sql/relational-databases/indexes/create-indexes-with-included-columns?view=sql-server-2017
        keyColumns: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        pattern: identifierRegex_1.default,
                    },
                    ascending: {
                        type: 'boolean',
                        default: true,
                    },
                },
                required: [
                    'name',
                ],
            },
        },
        includedColumns: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        pattern: identifierRegex_1.default,
                    },
                    ascending: {
                        type: 'boolean',
                        default: true,
                    },
                },
                required: [
                    'name',
                ],
            },
        },
    },
    required: [
        'keyColumns',
    ],
};
exports.default = schema;
