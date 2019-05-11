import { TableSchema } from "./TableSchema";

export
const SchemaSchema = {
    title: "PreQL Schema Schema",
    type: "object",
    properties: {
        // functions:
        // indexes: IndexSchema
        tables: {
            type: "object",
            additionalProperties: TableSchema
        }
        // views:
    },
    required: []
};