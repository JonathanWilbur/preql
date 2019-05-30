"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Based on this: https://github.com/garethr/kubernetes-json-schema/blob/master/v1.9.9/objectmeta.json
const APIObjectMetadataSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'PreQL API Object Metadata Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        annotations: {
            type: 'object',
            additionalProperties: {
                type: 'string',
            },
            default: {},
        },
        labels: {
            type: 'object',
            additionalProperties: {
                type: 'string',
            },
            default: {},
        },
        name: {
            type: 'string',
        },
        namespace: {
            type: 'string',
            default: 'default',
        },
    },
    required: [
        'name',
    ],
};
exports.default = APIObjectMetadataSchema;
