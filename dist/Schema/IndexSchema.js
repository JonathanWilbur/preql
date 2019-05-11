"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IndexKeySchema_1 = require("./IndexKeySchema");
exports.IndexSchema = {
    title: "PreQL Index Schema",
    type: "object",
    additionalProperties: true,
    properties: {
        comment: {
            type: "string"
        },
        keys: {
            type: "array",
            items: IndexKeySchema_1.IndexKeySchema
        },
        type: {
            type: "string",
            enum: [
                "plain",
                "primary",
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
