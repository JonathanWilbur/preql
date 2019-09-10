"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegexString_1 = __importDefault(require("../identifierRegexString"));
const APIObjectMetadata_1 = __importDefault(require("./APIObjectMetadata"));
/**
 * The root JSON schema for all APIObjects.
 */
const APIObjectSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL API Object Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        apiVersion: {
            type: "string",
            pattern: "^preql/(0|(?:[1-9]\\d*))\\.(0|(?:[1-9]\\d*))\\.(0|(?:[1-9]\\d*))$",
        },
        kind: {
            type: "string",
            pattern: identifierRegexString_1.default,
        },
        metadata: APIObjectMetadata_1.default,
        spec: {
            type: "object",
            additionalProperties: {},
        },
    },
    required: [
        "apiVersion",
        "kind",
        "metadata",
        "spec",
    ],
};
exports.default = APIObjectSchema;
//# sourceMappingURL=APIObject.js.map