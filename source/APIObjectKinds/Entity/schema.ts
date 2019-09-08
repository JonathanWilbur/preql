import identifierRegexString from "../../identifierRegexString";

const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Entity Specification Schema",
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
        databaseName: {
            type: "string",
            pattern: identifierRegexString,
        },
        rootStruct: {
            type: "string",
            pattern: identifierRegexString,
        },
    },
    required: [
        "name",
        "databaseName",
        "rootStruct",
    ],
};

export default schema;
