"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Entity Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
        },
        databaseName: {
            type: 'string',
        },
        rootStruct: {
            type: 'string',
        },
    },
    required: [
        'name',
        'databaseName',
        'rootStruct',
    ],
};
exports.default = schema;
