"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegexString_1 = __importDefault(require("../../identifierRegexString"));
const objectIdentifierRegexString_1 = __importDefault(require("../../objectIdentifierRegexString"));
const foreignKeyChangeAction = {
    type: "string",
    enum: [
        "no action",
        "cascade",
        "set null",
    ],
    default: "no action",
};
/**
 * The JSON schema for the `spec` section of a PreQL `ForeignKey`.
 *
 * @see /source/APIObjectKinds/ForeignKey/kind.
 */
const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Foreign Key Specification Schema",
    type: "object",
    additionalProperties: false,
    properties: {
        databaseName: {
            type: "string",
            pattern: identifierRegexString_1.default,
        },
        parentStructName: {
            type: "string",
            pattern: identifierRegexString_1.default,
        },
        childStructName: {
            type: "string",
            pattern: identifierRegexString_1.default,
        },
        name: {
            type: "string",
            pattern: identifierRegexString_1.default,
        },
        nullable: {
            type: "boolean",
            default: true,
        },
        onDeleteAction: foreignKeyChangeAction,
        onUpdateAction: foreignKeyChangeAction,
        objectIdentifier: {
            type: "string",
            pattern: objectIdentifierRegexString_1.default,
        },
        otherNames: {
            type: "array",
            items: {
                type: "string",
                pattern: identifierRegexString_1.default,
            },
        },
    },
    required: [
        "databaseName",
        "parentStructName",
        "childStructName",
        "name",
    ],
};
exports.default = schema;
//# sourceMappingURL=schema.js.map