"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'PreQL Entity Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        rootStruct: {
            type: 'string',
        },
    },
    required: [
        'rootStruct',
    ],
};
exports.default = schema;
