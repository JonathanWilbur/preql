"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateObject_1 = __importDefault(require("../../Commands/validateObject"));
const normalizeError_1 = __importDefault(require("../../normalizeError"));
const handler = async (event, context, callback) => {
    if (!(typeof event === 'object')) {
        callback(new Error('Event was not of an object type.'));
        return;
    }
    const body = (() => {
        if (event.body)
            return JSON.parse(event.body); // AWS HTTP Request
        if (event.apiVersion && event.kind)
            return event; // Lambda Call
        return undefined;
    })();
    if (!body) {
        callback(new Error('Event was not a recognizable type.'));
        return;
    }
    try {
        callback(null, {
            valid: true,
            specValidated: await validateObject_1.default(body),
            validatedObject: body,
        });
    }
    catch (e) {
        callback(normalizeError_1.default(e));
    }
};
exports.default = handler;
