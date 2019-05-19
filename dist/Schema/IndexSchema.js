"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IndexKeySchema_1 = __importDefault(require("./IndexKeySchema"));
const IndexSchema = {
    title: 'PreQL Index Schema',
    type: 'object',
    additionalProperties: true,
    properties: {
        comment: {
            type: 'string',
        },
        keys: {
            type: 'array',
            items: IndexKeySchema_1.default,
            minItems: 1,
            uniqueItems: true,
        },
        type: {
            type: 'string',
            enum: [
                'plain',
                'primary',
                'unique',
                'text',
                'spatial',
            ],
        },
    },
    required: [
        'keys',
        'type',
    ],
};
exports.default = IndexSchema;
