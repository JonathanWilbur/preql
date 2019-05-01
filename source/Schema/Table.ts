import { ColumnSchema } from "./Column";

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
        }
    },
    required: []
};