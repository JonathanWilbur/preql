"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaSchema_1 = require("./SchemaSchema");
const ColumnSchema_1 = require("./ColumnSchema");
exports.rootSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    title: "PreQL Root Schema",
    type: "object",
    additionalProperties: true,
    properties: {
        interfaces: {
            type: "object",
            additionalProperties: {
                type: "array",
                items: ColumnSchema_1.ColumnSchema
            }
        },
        // roles: RoleSchema
        schema: {
            type: "object",
            additionalProperties: SchemaSchema_1.SchemaSchema
        }
        // users: UserSchema
    },
    required: []
};
