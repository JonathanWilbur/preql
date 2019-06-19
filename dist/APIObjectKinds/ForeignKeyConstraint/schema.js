"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegex_1 = __importDefault(require("../../identifierRegex"));
const keyReference = {
    type: 'object',
    properties: {
        struct: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        key: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    attributeName: {
                        type: 'string',
                        pattern: identifierRegex_1.default,
                    },
                },
                required: [
                    'attributeName',
                ],
            },
        },
    },
    required: [
        'struct',
        'key',
    ],
};
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
    title: 'PreQL Foreign Key Constraint Specification Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        databaseName: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        child: keyReference,
        parent: keyReference,
        onDeleteAction: foreignKeyChangeAction,
        onUpdateAction: foreignKeyChangeAction,
    },
    required: [
        'name',
        'databaseName',
        'child',
        'parent',
    ],
};
exports.default = schema;
