"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'PreQL Data Type Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        category: {
            type: 'string',
            enum: [
                'integer',
                'real',
                'string',
                'binary',
            ],
        },
        regexes: {
            type: 'object',
            description: 'A map of regex kinds.',
            additionalProperties: {
                type: 'object',
                description: 'A map of match groups. If all regexes under one match group match the value, the value matches.',
                additionalProperties: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            pattern: {
                                type: 'string',
                            },
                            positive: {
                                type: 'boolean',
                                default: true,
                            },
                        },
                        required: [
                            'pattern',
                        ],
                    },
                },
            },
        },
        targets: {
            type: 'object',
            additionalProperties: {
                type: 'object',
                properties: {
                    return: {
                        type: 'string',
                    },
                    returnBasedOnLength: {
                        type: 'object',
                        propertyNames: {
                            pattern: '^[1-9]\\d+$',
                        },
                        additionalProperties: {
                            type: 'string',
                        },
                    },
                    check: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                    setters: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    },
    required: [
        'category',
        'targets',
    ],
};
exports.default = schema;
