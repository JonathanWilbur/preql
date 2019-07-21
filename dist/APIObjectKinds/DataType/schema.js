"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objectIdentifierRegexString_1 = __importDefault(require("../../objectIdentifierRegexString"));
const identifierRegexString_1 = __importDefault(require("../../identifierRegexString"));
const targetsMapSchema = {
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
};
const booleanSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL String Data Type Specification Schema',
    type: 'object',
    additionalProperties: true,
    properties: {
        jsonEquivalent: {
            const: 'boolean',
        },
        targets: targetsMapSchema,
    },
    required: [
        'jsonEquivalent',
        'targets',
    ],
};
const stringSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL String Data Type Specification Schema',
    type: 'object',
    additionalProperties: true,
    properties: {
        jsonEquivalent: {
            const: 'string',
        },
        targets: targetsMapSchema,
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
            type: 'array',
            items: {
                anyOf: [
                    // trim
                    {
                        type: 'object',
                        properties: {
                            type: {
                                type: 'string',
                                enum: ['trim'],
                            },
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
                        required: [
                            'type',
                        ],
                    },
                    // substring
                    {
                        type: 'object',
                        properties: {
                            type: {
                                type: 'string',
                                enum: ['substring'],
                            },
                            fromIndex: {
                                type: 'number',
                                minimum: 0,
                            },
                            toIndex: {
                                type: 'number',
                                minimum: 1,
                            },
                        },
                        required: [
                            'type',
                            'fromIndex',
                        ],
                    },
                    // replace
                    {
                        type: 'object',
                        properties: {
                            type: {
                                type: 'string',
                                enum: ['replace'],
                            },
                            from: {
                                type: 'string',
                            },
                            to: {
                                type: 'string',
                            },
                        },
                        required: [
                            'type',
                            'from',
                            'to',
                        ],
                    },
                    // case
                    {
                        type: 'object',
                        properties: {
                            type: {
                                type: 'string',
                                enum: ['case'],
                            },
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
                            'type',
                            'casing',
                        ],
                    },
                    // pad
                    {
                        type: 'object',
                        properties: {
                            type: {
                                type: 'string',
                                enum: ['pad'],
                            },
                            side: {
                                type: 'string',
                                enum: [
                                    'left',
                                    'right',
                                ],
                            },
                            padLength: {
                                type: 'number',
                                minimum: 1,
                            },
                            padString: {
                                type: 'string',
                                minLength: 1,
                            },
                        },
                        required: [
                            'type',
                            'side',
                            'padLength',
                            'padString',
                        ],
                    },
                    // now
                    {
                        type: 'object',
                        properties: {
                            type: {
                                type: 'string',
                                enum: ['now'],
                            },
                        },
                        required: [
                            'type',
                        ],
                    },
                ],
            },
        },
    },
    required: [
        'jsonEquivalent',
        'targets',
    ],
};
const numberSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Number Data Type Specification Schema',
    type: 'object',
    additionalProperties: true,
    properties: {
        jsonEquivalent: {
            oneOf: [
                {
                    const: 'number',
                },
                {
                    const: 'integer',
                },
            ],
        },
        minimum: {
            type: 'number',
        },
        maximum: {
            type: 'number',
        },
        targets: targetsMapSchema,
    },
    required: [
        'jsonEquivalent',
        'targets',
    ],
};
const enumSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Enum Data Type Specification Schema',
    type: 'object',
    additionalProperties: true,
    properties: {
        jsonEquivalent: {
            const: 'string',
        },
        name: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        values: {
            type: 'array',
            items: {
                type: 'string',
                minLength: 1,
                maxLength: 32,
            },
        },
    },
    required: [
        'jsonEquivalent',
        'name',
        'values',
    ],
};
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Data Type Specification Schema',
    allOf: [
        {
            type: 'object',
            // additionalProperties: true,
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
                syntaxObjectIdentifiers: {
                    type: 'array',
                    description: 'These should be arranged in order of descending preference. An array '
                        + 'of object identifiers is used instead of a single object identifier '
                        + 'because it cannot be guaranteed that every LDAP directory will '
                        + 'support the same syntaxes. Allowing multiple "backup" object '
                        + 'identifiers makes it less likely that a suitable syntax will not be '
                        + 'found.',
                    items: {
                        type: 'string',
                        pattern: objectIdentifierRegexString_1.default,
                    },
                },
                lengthUnits: {
                    type: 'string',
                    description: 'A purely informational field.',
                },
            },
        },
        {
            /**
             * I don't think you can use oneOf here, because booleanSchema will match
             * almost anything. I also think the ordering might matter. We want the
             * stricter schema to be evaluated first.
             */
            anyOf: [
                numberSchema,
                enumSchema,
                stringSchema,
                booleanSchema,
            ],
        },
    ],
};
exports.default = schema;
