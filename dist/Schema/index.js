"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = require("./Schema");
exports.rootSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    title: "PreQL Root Schema",
    type: "object",
    additionalProperties: true,
    properties: {
        // roles: RoleSchema
        schema: {
            type: "object",
            additionalProperties: Schema_1.SchemaSchema
        }
        // users: UserSchema
    },
    required: []
};
