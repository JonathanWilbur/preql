"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegex_1 = __importDefault(require("../../identifierRegex"));
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
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
            pattern: identifierRegex_1.default,
        },
        tlsSupported: {
            type: 'boolean',
        },
        starttlsSupported: {
            type: 'boolean',
        },
        options: {
            type: 'object',
            properties: {
                timezone: {
                    type: ['number', 'string'],
                    description: 'If this is a string, it should be a TZ Database timezone name. If it is a number, it should be a UTC offset.',
                    minimum: -12,
                    maximum: 14,
                },
            },
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
