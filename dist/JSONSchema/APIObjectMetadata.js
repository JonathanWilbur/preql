"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Based on this: https://github.com/garethr/kubernetes-json-schema/blob/master/v1.9.9/objectmeta.json
const APIObjectMetadataSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL API Object Metadata Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        annotations: {
            type: "object",
            propertyNames: {
                // https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
                // eslint-disable-next-line max-len
                unicodePattern: "^(?:(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.)*(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.?/))?[a-z0-9A-Z](?:[a-z0-9A-Z-_\\.]*[a-z0-9A-Z])?$",
                minLength: 1,
                maxLength: 317,
            },
            additionalProperties: {
                type: "string",
            },
            default: {},
        },
        labels: {
            type: "object",
            propertyNames: {
                // https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
                // eslint-disable-next-line max-len
                unicodePattern: "^(?:(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.)*(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.?/))?[a-z0-9A-Z](?:[a-z0-9A-Z-_\\.]*[a-z0-9A-Z])?$",
                minLength: 1,
                maxLength: 317,
            },
            additionalProperties: {
                type: "string",
            },
            default: {},
        },
        name: {
            type: "string",
            // https://kubernetes.io/docs/concepts/overview/working-with-objects/names/
            unicodePattern: "^(\\p{L}|\\p{N}|\\.|-){1,253}$",
            minLength: 1,
            maxLength: 253,
        },
        namespace: {
            type: "string",
            default: "default",
            // https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
            unicodePattern: "^(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-)*(\\p{L}|\\p{N}))?$",
            minLength: 1,
            maxLength: 63,
        },
    },
    required: [
        "name",
    ],
};
exports.default = APIObjectMetadataSchema;
//# sourceMappingURL=APIObjectMetadata.js.map