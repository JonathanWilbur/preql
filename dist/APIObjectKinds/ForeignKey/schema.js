"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegexString_1 = __importDefault(require("../../identifierRegexString"));
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
            pattern: identifierRegexString_1.default,
        },
        parentStructName: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        childStructName: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        name: {
            type: 'string',
            pattern: identifierRegexString_1.default,
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
        'parentStructName',
        'childStructName',
        'name',
    ],
};
exports.default = schema;
