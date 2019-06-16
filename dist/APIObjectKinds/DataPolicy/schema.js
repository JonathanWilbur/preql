"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'PreQL Data Policy Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        selector: {
            type: 'object',
            properties: {
                matchLabels: {
                    type: 'object',
                    additionalProperties: {
                        type: 'string',
                    },
                },
            },
            required: [
                'matchLabels',
            ],
        },
        require: {
            type: 'object',
            properties: {
                queryLogs: {
                    type: 'boolean',
                },
                slowQueryLogs: {
                    type: 'boolean',
                },
                insertLogs: {
                    type: 'boolean',
                },
                updateLogs: {
                    type: 'boolean',
                },
                flag: {
                    type: 'boolean',
                },
                nonExistence: {
                    type: 'boolean',
                },
            },
        },
        nonComplianceAction: {
            type: 'string',
            enum: [
                'warn',
                'ignore',
            ],
        },
    },
    required: [
        'selector',
        'require',
        'nonComplianceAction',
    ],
};
exports.default = schema;
