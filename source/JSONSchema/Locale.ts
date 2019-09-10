import iso3166CountryCodes from "../iso3166CountryCodes";
import iso639LanguageCodes from "../iso639LanguageCodes";

/**
 * The JSON schema for a locale.
 */
const Locale = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Locale Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        country: {
            type: "string",
            enum: iso3166CountryCodes,
        },
        language: {
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
