import identifierRegexString from "../identifierRegexString";
import APIObjectMetadataSchema from "./APIObjectMetadata";

/**
 * The root JSON schema for all APIObjects.
 */
const APIObjectSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL API Object Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        apiVersion: {
            title: "API Object Version",
            description:
                "A version identifier for API objects identifying the version "
                + "of the PreQL API that should be used to process that "
                + "object.",
            type: "string",
            pattern: "^preql/1\\.(0|(?:[1-9]\\d*))\\.(0|(?:[1-9]\\d*))$",
        },
        kind: {
            title: "Kind",
            description:
                "An identifier of the type of the object, which can be "
                + "thought of as the 'class' of the object.",
            type: "string",
            pattern: identifierRegexString,
        },
        metadata: APIObjectMetadataSchema,
        spec: {
            title: "Spec",
            description:
                "The actual object's specification, the contents of which "
                + "will vary based on the `kind` of the object.",
            type: "object",
            additionalProperties: {},
        },
    },
    required: [
        "apiVersion",
        "kind",
        "metadata",
        "spec",
    ],
};

export default APIObjectSchema;
