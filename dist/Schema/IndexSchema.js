"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IndexKeySchema_1 = require("./IndexKeySchema");
exports.IndexSchema = {
    title: "PreQL Index Schema",
    type: "object",
    additionalProperties: true,
    properties: {
        keys: {
            type: "array",
            items: IndexKeySchema_1.IndexKeySchema
        },
        type: {
            type: "string",
            enum: [
                "primary",
                "foreign",
                "unique",
                "text",
                "spatial"
            ]
        }
    },
    required: [
        "type"
    ]
};
