import identifierRegexString from "../../identifierRegexString";

/**
 * The JSON schema for the `spec` section of a PreQL `Entry`.
 *
 * @see /source/APIObjectKinds/Entry/kind.
 */
const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Entry Specification Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        databaseName: {
            type: "string",
            pattern: identifierRegexString,
        },
        structName: {
            type: "string",
            pattern: identifierRegexString,
        },
        id: {
            type: "number",
            minimum: 1,
        },
        layer: {
            type: "number",
            minimum: 0,
            default: 0,
        },
        distinguishedName: {
            type: "string",
            // TODO: Obviously, more validation is needed than this.
            unicodePattern: "^[^#].*=.+",
        },
        values: {
            type: "object",
            propertyNames: {
                pattern: identifierRegexString,
            },
            additionalProperties: {
                type: [
                    "boolean",
                    "number",
                    "string",
                ],
            },
        },
    },
    required: [
        "databaseName",
        "structName",
        "id",
    ],
};

export default schema;
