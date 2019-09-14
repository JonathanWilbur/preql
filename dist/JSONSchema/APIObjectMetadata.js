"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The JSON schema for the metadata section of all APIObjects. Based on the
 * Kubernetes API object metadata.
 * @see https://github.com/garethr/kubernetes-json-schema/blob/master/v1.9.9/objectmeta.json
 */
const APIObjectMetadataSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL API Object Metadata Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        annotations: {
            title: "Annotations",
            description: "A map of arbitrary key-value pairs that are for humans to "
                + "read, and MUST not be used by programs in any way except "
                + "being displayed to users.",
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
            title: "Labels",
            description: "A map of arbitrary key-value pairs that are generally "
                + "shorter than those used in `metadata.annotations` and "
                + "intended, or at least more readily usable, for programs.",
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
            title: "Name",
            description: "A name for PreQL and related tools to use to handle the "
                + "object, and to display errors, logs, or other diagnostic "
                + "data to users, and to search for and index objects. Even "
                + "if the `spec` has a `name` or name-like member, this "
                + "should be used for identifying objects within PreQL, for "
                + "indexing, for logging, and for errors.",
            type: "string",
            // https://kubernetes.io/docs/concepts/overview/working-with-objects/names/
            unicodePattern: "^(\\p{L}|\\p{N}|\\.|-){1,253}$",
            minLength: 1,
            maxLength: 253,
        },
        namespace: {
            title: "Namespace",
            description: "A case-insensitive identifier that namespaces objects so "
                + "that those with duplicated names do not collide.",
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