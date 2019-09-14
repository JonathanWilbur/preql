"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegexString_1 = __importDefault(require("../../identifierRegexString"));
const iso3166CountryCodes_1 = __importDefault(require("../../iso3166CountryCodes"));
const iso639LanguageCodes_1 = __importDefault(require("../../iso639LanguageCodes"));
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
            pattern: identifierRegexString_1.default,
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
            enum: iso3166CountryCodes_1.default,
        },
        language: {
            type: "string",
            enum: iso639LanguageCodes_1.default,
        },
        defaultCollation: {
            type: "string",
            pattern: identifierRegexString_1.default,
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
exports.default = schema;
//# sourceMappingURL=schema.js.map