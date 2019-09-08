import identifierRegexString from "../../identifierRegexString";
import objectIdentifierRegexString from "../../objectIdentifierRegexString";

const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Attribute Schema",
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
        default: {
            type: [
                "number",
                "string",
            ],
        },
        nullable: {
            type: "boolean",
            default: true,
        },
        type: {
            type: "string",
            unicodePattern: "^(\\p{L}|\\p{N}|\\.|-){1,253}$",
        },
        length: {
            type: "integer",
            minimum: 1,
        },
        // Mostly used for LDAP: Whether an entity can have multiple of these attributes.
        // See: http://www.openldap.org/doc/admin22/schema.html
        // If multiValued with an RDBMS target, it should be broken into its own separate table,
        // and implement a FKC linking it to the parent table.
        multiValued: {
            type: "boolean",
            default: false,
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
        otherNames: {
            type: "array",
            items: {
                type: "string",
                pattern: identifierRegexString,
            },
        },
        matchingRules: {
            type: "array",
            items: {
                type: "string",
                pattern: objectIdentifierRegexString,
            },
        },
        orderingRules: {
            type: "array",
            items: {
                type: "string",
                pattern: objectIdentifierRegexString,
            },
        },
        substringRules: {
            type: "array",
            items: {
                type: "string",
                pattern: objectIdentifierRegexString,
            },
        },
    },
    required: [
        "name",
        "structName",
        // 'entityName',
        "databaseName",
        "type",
    ],
};

export default schema;
