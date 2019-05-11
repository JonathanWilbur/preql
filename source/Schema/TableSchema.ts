import { ColumnSchema } from "./ColumnSchema";
import { IndexSchema } from "./IndexSchema";

export
const TableSchema = {
    title: "PreQL Table Schema",
    type: "object",
    additionalProperties: true,
    properties: {
        columns: {
            type: "object",
            additionalProperties: ColumnSchema
        },
        comment: {
            type: "string"
        },
        indexes: {
            type: "object",
            additionalProperties: IndexSchema
        }
    },
    required: []
};