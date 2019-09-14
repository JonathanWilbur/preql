"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPath_1 = __importDefault(require("../../Commands/getPath"));
/**
 * @see /source/Commands/getPath.
 */
const handler = async (event, context, callback) => {
    if (!(typeof event === "object")) {
        callback(new Error("Event was not of an object type."));
        return;
    }
    const body = (() => {
        if (event.body)
            return JSON.parse(event.body); // AWS HTTP Request
        if (event.apiObject)
            return event; // Lambda Call
        return undefined;
    })();
    if (!body) {
        callback(new Error("Event was not a recognizable type."));
        return;
    }
    callback(null, { path: await getPath_1.default(body) });
};
exports.default = handler;
//# sourceMappingURL=getPath.js.map