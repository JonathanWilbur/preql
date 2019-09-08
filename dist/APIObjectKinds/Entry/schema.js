"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegexString_1 = __importDefault(require("../../identifierRegexString"));
const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Entry Specification Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        databaseName: {
            type: "string",
            pattern: identifierRegexString_1.default,
        },
        structName: {
            type: "string",
            pattern: identifierRegexString_1.default,
        },
        id: {
            type: "number",
            minimum: 1,
        },
        distinguishedName: {
            type: "string",
            // TODO: Obviously, more validation is needed than this.
            unicodePattern: "^[^#].*=.+",
        },
        values: {
            type: "object",
            propertyNames: {
                pattern: identifierRegexString_1.default,
            },
            additionalProperties: {
                type: [
                    "boolean",
                    "number",
                    "string",
                ],
            },
        },
    },
    required: [
        "databaseName",
        "structName",
        "id",
    ],
};
exports.default = schema;
//# sourceMappingURL=schema.js.map