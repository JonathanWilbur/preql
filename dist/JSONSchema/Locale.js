"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iso3166CountryCodes_1 = __importDefault(require("../iso3166CountryCodes"));
const iso639LanguageCodes_1 = __importDefault(require("../iso639LanguageCodes"));
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
            enum: iso3166CountryCodes_1.default,
        },
        language: {
            title: "Language",
            description: "The ISO 639 Language Code.",
            type: "string",
            enum: iso639LanguageCodes_1.default,
        },
    },
    required: [
        "country",
        "language",
    ],
};
exports.default = Locale;
//# sourceMappingURL=Locale.js.map