"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnSchema_1 = __importDefault(require("./ColumnSchema"));
const IndexSchema_1 = __importDefault(require("./IndexSchema"));
const ForeignKeyConstraintSchema_1 = __importDefault(require("./ForeignKeyConstraintSchema"));
const TableSchema = {
    title: 'PreQL Table Schema',
    type: 'object',
    additionalProperties: true,
    properties: {
        columns: {
            type: 'object',
            additionalProperties: ColumnSchema_1.default,
        },
        comment: {
            type: 'string',
        },
        foreignkeys: {
            type: 'object',
            additionalProperties: ForeignKeyConstraintSchema_1.default,
        },
        // It may be possible to use references for this, but then you run into
        // issues with parsing including, but not limited to, infinite recursion.
        implements: {
            type: 'array',
            items: {
                type: 'string',
            },
            minItems: 1,
            uniqueItems: true,
        },
        indexes: {
            type: 'object',
            additionalProperties: IndexSchema_1.default,
        },
    },
    required: [
        'columns',
    ],
};
exports.default = TableSchema;
