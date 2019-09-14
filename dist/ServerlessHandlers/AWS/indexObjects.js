"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexObjects_1 = __importDefault(require("../../Commands/indexObjects"));
const normalizeError_1 = __importDefault(require("../../normalizeError"));
/**
 * @see /source/Commands/indexObjects.
 */
const handler = async (event, context, callback) => {
    if (!(typeof event === "object")) {
        callback(new Error("Event was not of an object type."));
        return;
    }
    const body = (() => {
        if (event.body)
            return JSON.parse(event.body); // AWS HTTP Request
        if (event.objects && Array.isArray(event.objects))
            return event; // Lambda Call
        return undefined;
    })();
    if (!body) {
        callback(new Error("Event was not a recognizable type."));
        return;
    }
    if (body.objects.length === 0) {
        callback(null, {});
        return;
    }
    try {
        const namespaces = await indexObjects_1.default(body.objects);
        // See: https://stackoverflow.com/questions/44740423/create-json-string-from-js-map-and-string
        callback(null, {
            namespaces,
            numberOfObjects: body.objects.length,
        });
    }
    catch (e) {
        callback(normalizeError_1.default(e));
    }
};
exports.default = handler;
//# sourceMappingURL=indexObjects.js.map