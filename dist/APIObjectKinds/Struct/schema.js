"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'PreQL Struct Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
        },
        entityName: {
            type: 'string',
        },
        databaseName: {
            type: 'string',
        },
    },
    required: [
        'name',
        // 'entityName',
        'databaseName',
    ],
};
exports.default = schema;
