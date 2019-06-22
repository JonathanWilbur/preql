"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Data Type Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        jsonEquivalent: {
            type: 'string',
            enum: [
                'boolean',
                'integer',
                'number',
                'string',
                'array',
            ],
        },
        lengthUnits: {
            type: 'string',
            description: 'A purely informational field.',
        },
        minimum: {
            type: 'number',
        },
        maximum: {
            type: 'number',
        },
        regexes: {
            type: 'object',
            description: 'A map of regex kinds.',
            propertyNames: {
                pattern: '^[A-Za-z0-9]+$',
                minLength: 1,
                maxLength: 32,
            },
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
        setters: {
            type: 'object',
            properties: {
                trim: {
                    type: 'object',
                    properties: {
                        side: {
                            type: 'string',
                            enum: [
                                'left',
                                'right',
                                'both',
                            ],
                            default: 'both',
                        },
                    },
                },
                substring: {
                    type: 'object',
                    properties: {
                        fromIndex: {
                            type: 'number',
                            minimum: 0,
                        },
                        toIndex: {
                            type: 'number',
                            minimum: 1,
                        },
                        reverse: {
                            type: 'boolean',
                            default: false,
                        },
                    },
                },
                replace: {
                    type: 'object',
                    additionalProperties: {
                        type: 'string',
                    },
                },
                case: {
                    type: 'object',
                    properties: {
                        casing: {
                            type: 'string',
                            enum: [
                                'upper',
                                'lower',
                                'title',
                                'sentence',
                            ],
                        },
                    },
                    required: [
                        'casing',
                    ],
                },
                pad: {
                    type: 'object',
                    properties: {
                        side: {
                            type: 'string',
                            enum: [
                                'left',
                                'right',
                            ],
                        },
                        padString: {
                            type: 'string',
                            minLength: 1,
                        },
                    },
                },
            },
            now: {
                type: 'object',
                properties: {},
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
                },
            },
        },
    },
    required: [
        'jsonEquivalent',
        'targets',
    ],
};
exports.default = schema;
