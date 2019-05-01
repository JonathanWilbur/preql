"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Column_1 = require("./Column");
exports.TableSchema = {
    title: "PreQL Table Schema",
    type: "object",
    additionalProperties: true,
    properties: {
        columns: {
            type: "object",
            additionalProperties: Column_1.ColumnSchema
        },
        comment: {
            type: "string"
        }
    },
    required: []
};
