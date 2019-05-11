"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TableSchema_1 = require("./TableSchema");
exports.SchemaSchema = {
    title: "PreQL Schema Schema",
    type: "object",
    properties: {
        // functions:
        // indexes: IndexSchema
        tables: {
            type: "object",
            additionalProperties: TableSchema_1.TableSchema
        }
        // views:
    },
    required: []
};
