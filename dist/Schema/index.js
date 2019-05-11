"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaSchema_1 = require("./SchemaSchema");
exports.rootSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    title: "PreQL Root Schema",
    type: "object",
    additionalProperties: true,
    properties: {
        // roles: RoleSchema
        schema: {
            type: "object",
            additionalProperties: SchemaSchema_1.SchemaSchema
        }
        // users: UserSchema
    },
    required: []
};
