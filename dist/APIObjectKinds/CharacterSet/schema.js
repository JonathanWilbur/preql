"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegex_1 = __importDefault(require("../../identifierRegex"));
const iso3166CountryCodes_1 = __importDefault(require("../../iso3166CountryCodes"));
const iso639LanguageCodes_1 = __importDefault(require("../../iso639LanguageCodes"));
/**
 * This kind exists because different DBMSs have different names for the same
 * character sets. This kind maps an arbitrarily-named character set to its
 * real equivalents in the targeted DBMS language.
 */
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL CharacterSet Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        targetEquivalents: {
            type: 'object',
            description: 'Maps targets to their character set, such as mysql => utf8mb4.',
            additionalProperties: {
                type: 'string',
            },
        },
        country: {
            type: 'string',
            enum: iso3166CountryCodes_1.default,
        },
        language: {
            type: 'string',
            enum: iso639LanguageCodes_1.default,
        },
        defaultCollation: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        maximumCharacterLength: {
            type: 'number',
            minimum: 1,
        },
    },
    required: [
        'name',
        'targetEquivalents',
    ],
};
exports.default = schema;
