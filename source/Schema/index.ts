import { SchemaSchema } from "./Schema";

export
const rootSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    title: "PreQL Root Schema",
    type: "object",
    additionalProperties: true,
    properties: {
        // roles: RoleSchema
        schema: {
            type: "object",
            additionalProperties: SchemaSchema
        }
        // users: UserSchema
    },
    required: []
};