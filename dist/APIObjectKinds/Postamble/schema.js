"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'PreQL Postamble Specification Schema',
    description: 'This gets added to the bottom of a generated script.',
    type: 'object',
    additionalProperties: false,
    properties: {
        uncommentedText: {
            type: 'string',
        },
    },
    required: [
        'uncommentedText',
    ],
};
exports.default = schema;
