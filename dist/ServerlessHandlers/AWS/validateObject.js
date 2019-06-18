"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateObject_1 = __importDefault(require("../../Commands/validateObject"));
const normalizeError_1 = __importDefault(require("../../normalizeError"));
const handler = async (event, context, callback) => {
    // REVIEW: Handle JSON and YAML strings, too?
    if (!(typeof event === 'object'))
        callback(new Error('Event was not of an object type.'));
    try {
        callback(null, {
            valid: true,
            specValidated: await validateObject_1.default(event),
            validatedObject: event,
        });
    }
    catch (e) {
        callback(normalizeError_1.default(e));
    }
};
exports.default = handler;
