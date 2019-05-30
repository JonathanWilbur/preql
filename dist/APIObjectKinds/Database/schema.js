"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'PreQL Database Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
        },
        collation: {
            type: 'string',
            default: 'utf8',
            description: 'Only lowercase alphabetic and numeric characters from the acronym'
                + '/ symbol of the character encoding.',
        },
        characterSet: {
            type: 'string',
        },
    },
    required: [
        'name',
    ],
};
exports.default = schema;
