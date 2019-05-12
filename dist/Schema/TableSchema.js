"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnSchema_1 = require("./ColumnSchema");
const IndexSchema_1 = require("./IndexSchema");
exports.TableSchema = {
    title: "PreQL Table Schema",
    type: "object",
    additionalProperties: true,
    properties: {
        columns: {
            type: "object",
            additionalProperties: ColumnSchema_1.ColumnSchema
        },
        comment: {
            type: "string"
        },
        // It may be possible to use references for this, but then you run into
        // issues with parsing including, but not limited to, infinite recursion.
        implements: {
            type: "array",
            items: {
                type: "string"
            }
        },
        indexes: {
            type: "object",
            additionalProperties: IndexSchema_1.IndexSchema
        }
    },
    required: []
};
