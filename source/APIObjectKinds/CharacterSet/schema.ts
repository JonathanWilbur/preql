import identifierRegexString from "../../identifierRegexString";
import iso3166CountryCodes from "../../iso3166CountryCodes";
import iso639LanguageCodes from "../../iso639LanguageCodes";

/**
 * The JSON schema for the `spec` section of a PreQL `CharacterSet`.
 *
 * @see /source/APIObjectKinds/CharacterSet/kind.
 */
const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL CharacterSet Specification Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        name: {
            type: "string",
            pattern: identifierRegexString,
        },
        targetEquivalents: {
            type: "object",
            description: "Maps targets to their character set, such as mysql => utf8mb4.",
            additionalProperties: {
                type: "string",
            },
        },
        country: {
            type: "string",
            enum: iso3166CountryCodes,
        },
        language: {
            type: "string",
            enum: iso639LanguageCodes,
        },
        defaultCollation: {
            type: "string",
            pattern: identifierRegexString,
        },
        maximumCharacterLength: {
            type: "number",
            minimum: 1,
        },
    },
    required: [
        "name",
        "targetEquivalents",
    ],
};

export default schema;
