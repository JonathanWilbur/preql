"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexObjects_1 = __importDefault(require("../../Commands/indexObjects"));
const validateNamespace_1 = __importDefault(require("../../Commands/validateNamespace"));
const validateObject_1 = __importDefault(require("../../Commands/validateObject"));
const normalizeError_1 = __importDefault(require("../../normalizeError"));
/**
 * This function validates all objects structually and semantically.
 *
 * @see /source/Commands/validateNamespace.
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
    if (typeof body.objects !== "object" || !Array.isArray(body.objects)) {
        callback(new Error("Event was supposed to have an `objects` array."));
        return;
    }
    if (body.objects.length === 0) {
        callback(null, {
            namespaces: {},
            numberOfObjects: 0,
            valid: true,
        });
        return;
    }
    try {
        await Promise.all(body.objects.map(validateObject_1.default));
        const namespaces = await indexObjects_1.default(body.objects);
        await Promise.all(Object.values(namespaces).map(validateNamespace_1.default));
        callback(null, {
            namespaces,
            numberOfObjects: body.objects.length,
            valid: true,
        });
    }
    catch (e) {
        callback(normalizeError_1.default(e));
    }
};
exports.default = handler;
//# sourceMappingURL=validate.js.map