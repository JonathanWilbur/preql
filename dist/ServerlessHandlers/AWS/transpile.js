"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HandlerEvent_1 = __importDefault(require("../../JSONSchema/HandlerEvent"));
const transpile_1 = __importDefault(require("../../Commands/transpile"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const validateHandlerEvent = ajv.compile(HandlerEvent_1.default);
const handler = (event, context, callback) => {
    // REVIEW: Handle JSON and YAML strings, too?
    if (!(typeof event === 'object'))
        callback(new Error('Event was not of an object type.'));
    const valid = validateHandlerEvent(event);
    if (!valid) {
        callback(new Error('Input PreQL was invalid. Errors: '
            + `${(validateHandlerEvent.errors || []).map(e => e.message).join('\r\n')}`));
        return;
    }
    transpile_1.default(event.namespace || 'default', event.transpileTo, event.objects)
        .then((result) => {
        callback(null, result);
    });
};
exports.default = handler;
