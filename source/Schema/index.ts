import { SchemaSchema } from "./SchemaSchema";
import { ColumnSchema } from "./ColumnSchema";

export
const rootSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    title: "PreQL Root Schema",
    type: "object",
    additionalProperties: true,
    properties: {
        interfaces: {
            type: "object",
            additionalProperties: {
                type: "array",
                items: ColumnSchema
            }
        },
        // roles: RoleSchema
        schema: {
            type: "object",
            additionalProperties: SchemaSchema
        }
        // users: UserSchema
    },
    required: []
};