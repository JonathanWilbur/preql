"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APIObjectMetadataSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'PreQL Namespace Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        collation: {
            type: 'string',
            default: 'utf8',
            description: 'Only lowercase alphabetic and numeric characters from the acronym'
                + '/ symbol of the character encoding.',
        },
    },
    required: [],
};
exports.default = APIObjectMetadataSchema;
