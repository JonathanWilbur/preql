import iso3166CountryCodes from "../iso3166CountryCodes";
import iso639LanguageCodes from "../iso639LanguageCodes";

/**
 * The JSON schema for a locale.
 */
const Locale = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Locale Schema",
    description: "An ISO 15897 Locale Identifier. This does not currently support the codeset or modifier.",
    type: "object",
    additionalProperties: false,
    properties: {
        country: {
            title: "Country",
            description: "The ISO 3166 Country Code.",
            type: "string",
            enum: iso3166CountryCodes,
        },
        language: {
            title: "Language",
            description: "The ISO 639 Language Code.",
            type: "string",
            enum: iso639LanguageCodes,
        },
    },
    required: [
        "country",
        "language",
    ],
};

export default Locale;
