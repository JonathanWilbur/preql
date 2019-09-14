"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Locale_1 = __importDefault(require("../../JSONSchema/Locale"));
const timezones_1 = __importDefault(require("../../timezones"));
/**
 * The JSON schema for the `spec` section of a PreQL `Server`.
 *
 * @see /source/APIObjectKinds/Server/kind.
 */
const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Server Specification Schema",
    description: "This is not really used for anything.",
    type: "object",
    additionalProperties: false,
    properties: {
        name: {
            type: "string",
        },
        protocol: {
            // RFC 3987: scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
            type: "string",
            pattern: "^[A-Za-z][A-Za-z0-9\\+\\-\\.]*$",
        },
        hostname: {
            type: "string",
            // eslint-disable-next-line max-len
            unicodePattern: "^(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.)*(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.?)$",
            maxLength: 253,
        },
        port: {
            type: "number",
            minimum: 0,
            maximum: 65535,
        },
        tlsSupported: {
            type: "boolean",
        },
        starttlsSupported: {
            type: "boolean",
        },
        characterSet: {
            type: "string",
        },
        collation: {
            type: "string",
        },
        timezone: {
            type: "string",
            enum: timezones_1.default,
        },
        locale: {
            type: "object",
            properties: {
                dateAndTimeFormat: Locale_1.default,
                language: Locale_1.default,
                monetaryFormat: Locale_1.default,
                numberFormat: Locale_1.default,
            },
            required: [],
        },
        options: {
            type: "object",
            additionalProperties: {
                type: "string",
            },
        },
    },
    required: [
        "name",
        "hostname",
        "protocol",
    ],
};
exports.default = schema;
//# sourceMappingURL=schema.js.map