"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnSchema = {
    title: "PreQL Root Schema",
    type: "object",
    additionalProperties: true,
    properties: {
        comment: {
            type: "string"
        },
        // According to [this](https://stackoverflow.com/questions/16826128/why-is-this-json-schema-invalid-using-any-type),
        // {} will effectively give "default" an "any" type.
        default: {},
        type: {
            type: "string" // TODO: Add data type validation.
        }
    },
    required: [
        "type"
    ]
};
