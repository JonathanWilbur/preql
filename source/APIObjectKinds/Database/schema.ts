import identifierRegexString from "../../identifierRegexString";

/**
 * The JSON schema for the `spec` section of a PreQL `Database`.
 *
 * @see /source/APIObjectKinds/Database/kind.
 */
const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Database Specification Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        name: {
            type: "string",
            pattern: identifierRegexString,
        },
        characterSet: {
            type: "string",
            pattern: identifierRegexString,
        },
        collation: {
            type: "string",
            pattern: identifierRegexString,
        },
        serverName: {
            type: "string",
            // eslint-disable-next-line max-len
            unicodePattern: "^(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.)*(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.?)$",
        },
        maximumSizeInBytes: {
            type: "number",
            minimum: 1,
        },
    },
    required: [
        "name",
    ],
};

export default schema;
