"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaSchema_1 = __importDefault(require("./SchemaSchema"));
const ColumnSchema_1 = __importDefault(require("./ColumnSchema"));
const rootSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'PreQL Root Schema',
    type: 'object',
    additionalProperties: true,
    properties: {
        interfaces: {
            type: 'object',
            additionalProperties: {
                type: 'object',
                additionalProperties: ColumnSchema_1.default,
            },
        },
        // roles: RoleSchema
        schema: {
            type: 'object',
            additionalProperties: SchemaSchema_1.default,
        },
    },
    required: [],
};
exports.default = rootSchema;
