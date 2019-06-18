"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIObjectMetadata_1 = __importDefault(require("./APIObjectMetadata"));
const APIObjectSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL API Object Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        apiVersion: {
            type: 'string',
        },
        kind: {
            type: 'string',
        },
        metadata: APIObjectMetadata_1.default,
        spec: {
            type: 'object',
            additionalProperties: {},
        },
    },
    required: [
        'apiVersion',
        'kind',
        'metadata',
        'spec',
    ],
};
exports.default = APIObjectSchema;
