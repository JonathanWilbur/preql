"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TableSchema_1 = __importDefault(require("./TableSchema"));
const SchemaSchema = {
    title: 'PreQL Schema Schema',
    type: 'object',
    properties: {
        // functions
        tables: {
            type: 'object',
            additionalProperties: TableSchema_1.default,
        },
    },
    required: [],
};
exports.default = SchemaSchema;
