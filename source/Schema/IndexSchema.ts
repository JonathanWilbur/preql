import { IndexKeySchema } from "./IndexKeySchema";

export
const IndexSchema = {
    title: "PreQL Index Schema",
    type: "object",
    additionalProperties: true,
    properties: {
        keys: {
            type: "array",
            items: IndexKeySchema
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