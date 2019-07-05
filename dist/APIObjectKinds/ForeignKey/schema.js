"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegex_1 = __importDefault(require("../../identifierRegex"));
const foreignKeyChangeAction = {
    type: 'string',
    enum: [
        'no action',
        'cascade',
        'set null',
    ],
    default: 'no action',
};
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Foreign Key Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        databaseName: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        parentStruct: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        childStruct: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        attributeName: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        nullable: {
            type: 'boolean',
            default: true,
        },
        onDeleteAction: foreignKeyChangeAction,
        onUpdateAction: foreignKeyChangeAction,
    },
    required: [
        'databaseName',
        'parentStruct',
        'childStruct',
        'attributeName',
    ],
};
exports.default = schema;
