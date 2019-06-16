"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'PreQL Server Specification Schema',
    description: 'This is not really used for anything.',
    type: 'object',
    additionalProperties: false,
    properties: {
        protocol: {
            type: 'string',
        },
        hostname: {
            type: 'string',
        },
        port: {
            type: 'number',
            minimum: 0,
            maximum: 65535,
        },
        defaultDatabase: {
            type: 'string',
        },
        tlsSupported: {
            type: 'boolean',
        },
        starttlsSupported: {
            type: 'boolean',
        },
        options: {
            type: 'object',
            additionalProperties: {
                type: 'string',
            },
        },
    },
    required: [
        'hostname',
        'protocol',
    ],
};
exports.default = schema;
