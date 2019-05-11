"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnSchema = {
    title: "PreQL Column Schema",
    type: "object",
    additionalProperties: true,
    properties: {
        comment: {
            type: "string" // TODO: Optionally, another table.
        },
        // According to [this](https://stackoverflow.com/questions/16826128/why-is-this-json-schema-invalid-using-any-type),
        // {} will effectively give "default" an "any" type.
        default: {},
        nullable: {
            type: "boolean",
            default: true
        },
        type: {
            type: "string" // TODO: Add data type validation.
        },
        length: {
            type: "integer"
        },
        casing: {
            type: "string",
            enum: [
                "upper",
                "lower",
                "title",
                "sentence"
            ]
        }
    },
    required: [
        "type"
    ]
};