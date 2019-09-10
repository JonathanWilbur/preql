import identifierRegexString from "../../identifierRegexString";
import objectIdentifierRegexString from "../../objectIdentifierRegexString";

/**
 * The JSON schema for the `spec` section of a PreQL `Struct`.
 *
 * @see /source/APIObjectKinds/Struct/kind.
 */
const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Struct Specification Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        name: {
            type: "string",
            pattern: identifierRegexString,
        },
        pluralName: {
            type: "string",
            pattern: identifierRegexString,
        },
        entityName: {
            type: "string",
            pattern: identifierRegexString,
        },
        databaseName: {
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
        objectIdentifier: {
            type: "string",
            pattern: objectIdentifierRegexString,
        },
    },
    required: [
        "name",
        // 'entityName',
        "databaseName",
    ],
};

export default schema;
