"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegexString_1 = __importDefault(require("../../identifierRegexString"));
const iso3166CountryCodes_1 = __importDefault(require("../../iso3166CountryCodes"));
const iso639LanguageCodes_1 = __importDefault(require("../../iso639LanguageCodes"));
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
            pattern: identifierRegexString_1.default,
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
            enum: iso3166CountryCodes_1.default,
        },
        language: {
            type: "string",
            enum: iso639LanguageCodes_1.default,
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
exports.default = schema;
//# sourceMappingURL=schema.js.map