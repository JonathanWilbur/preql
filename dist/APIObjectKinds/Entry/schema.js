"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Entry Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        databaseName: {
            type: 'string',
        },
        structName: {
            type: 'string',
        },
        values: {
            type: 'object',
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
