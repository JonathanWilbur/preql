import identifierRegexString from "../../identifierRegexString";

/**
 * The JSON schema for the `spec` section of a PreQL `PlainIndex`.
 *
 * @see /source/APIObjectKinds/PlainIndex/kind.
 */
const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Primary Index Specification Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        name: {
            type: "string",
            pattern: identifierRegexString,
        },
        structName: {
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
        // eslint-disable-next-line max-len
        // See: https://docs.microsoft.com/en-us/sql/relational-databases/indexes/clustered-and-nonclustered-indexes-described?view=sql-server-2017
        clustered: {
            type: "boolean",
            default: false,
        },
        // eslint-disable-next-line max-len
        // See: https://docs.microsoft.com/en-us/sql/relational-databases/indexes/create-indexes-with-included-columns?view=sql-server-2017
        keyAttributes: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        pattern: identifierRegexString,
                    },
                    ascending: {
                        type: "boolean",
                        default: true,
                    },
                },
                required: [
                    "name",
                ],
            },
        },
        includedAttributes: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        pattern: identifierRegexString,
                    },
                    ascending: {
                        type: "boolean",
                        default: true,
                    },
                },
                required: [
                    "name",
                ],
            },
        },
    },
    required: [
        "name",
        "structName",
        "databaseName",
        "keyAttributes",
    ],
};

export default schema;
