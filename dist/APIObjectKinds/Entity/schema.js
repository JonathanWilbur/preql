"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegexString_1 = __importDefault(require("../../identifierRegexString"));
/**
 * The JSON schema for the `spec` section of a PreQL `Entity`.
 *
 * @see /source/APIObjectKinds/Entity/kind.
 */
const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Entity Specification Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        name: {
            type: "string",
            pattern: identifierRegexString_1.default,
        },
        pluralName: {
            type: "string",
            pattern: identifierRegexString_1.default,
        },
        databaseName: {
            type: "string",
            pattern: identifierRegexString_1.default,
        },
        rootStruct: {
            type: "string",
            pattern: identifierRegexString_1.default,
        },
    },
    required: [
        "name",
        "databaseName",
        "rootStruct",
    ],
};
exports.default = schema;
//# sourceMappingURL=schema.js.map