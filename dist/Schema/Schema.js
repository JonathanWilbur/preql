"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Table_1 = require("./Table");
exports.SchemaSchema = {
    title: "PreQL Schema Schema",
    type: "object",
    properties: {
        // functions:
        // indexes: IndexSchema
        tables: {
            type: "object",
            additionalProperties: Table_1.TableSchema
        }
        // views:
    },
    required: []
};
