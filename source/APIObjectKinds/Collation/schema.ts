import identifierRegexString from "../../identifierRegexString";
import iso3166CountryCodes from "../../iso3166CountryCodes";
import iso639LanguageCodes from "../../iso639LanguageCodes";

/**
 * The JSON schema for the `spec` section of a PreQL `Collation`.
 *
 * @see /source/APIObjectKinds/Collation/kind.
 */
const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Collation Specification Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        name: {
            type: "string",
            pattern: identifierRegexString,
        },
        targetEquivalents: {
            type: "object",
            description: "Maps targets to their collation, such as tsql => Latin1_General_100_CS_AS.",
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
        caseSensitive: {
            type: "boolean",
        },
        accentSensitive: {
            type: "boolean",
        },
        kanaSensitive: {
            type: "boolean",
        },
        widthSensitive: {
            type: "boolean",
        },
        variationSelectorSensitive: {
            type: "boolean",
        },
        binary: {
            type: "boolean",
        },
        characterSet: {
            type: "string",
        },
    },
    required: [
        "name",
        "targetEquivalents",
    ],
};

export default schema;
