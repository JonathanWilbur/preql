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
            title: "API Object Version",
            description: "A version identifier for API objects identifying the version "
                + "of the PreQL API that should be used to process that "
                + "object.",
            type: "string",
            pattern: "^preql/1\\.(0|(?:[1-9]\\d*))\\.(0|(?:[1-9]\\d*))$",
        },
        kind: {
            title: "Kind",
            description: "An identifier of the type of the object, which can be "
                + "thought of as the 'class' of the object.",
            type: "string",
            pattern: identifierRegexString_1.default,
        },
        metadata: APIObjectMetadata_1.default,
        spec: {
            title: "Spec",
            description: "The actual object's specification, the contents of which "
                + "will vary based on the `kind` of the object.",
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