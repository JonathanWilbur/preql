"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIObject_1 = __importDefault(require("./APIObject"));
const HandlerEventSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'PreQL Handler Event Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        transpileTo: {
            type: 'string',
        },
        ensureTheseThingsArePresent: {
            type: 'array',
            items: APIObject_1.default,
        },
        ensureTheseThingsAreAbsent: {
            type: 'array',
            items: APIObject_1.default,
        },
    },
    required: [
        'transpileTo',
        'ensureTheseThingsArePresent',
        'ensureTheseThingsAreAbsent',
    ],
};
exports.default = HandlerEventSchema;
