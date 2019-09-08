"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateObject_1 = __importDefault(require("../../Commands/validateObject"));
const validateNamespace_1 = __importDefault(require("../../Commands/validateNamespace"));
const indexObjects_1 = __importDefault(require("../../Commands/indexObjects"));
const getEntries_1 = __importDefault(require("../../Commands/getEntries"));
const normalizeError_1 = __importDefault(require("../../normalizeError"));
const handler = async (event, context, callback) => {
    if (!(typeof event === "object")) {
        callback(new Error("Event was not of an object type."));
        return;
    }
    const body = (() => {
        if (event.body)
            return JSON.parse(event.body); // AWS HTTP Request
        if (event.objects)
            return event; // Lambda Call
        return undefined;
    })();
    if (!body) {
        callback(new Error("Event was not a recognizable type."));
        return;
    }
    if (body.objects.length === 0) {
        callback(null, { entries: {} });
        return;
    }
    try {
        await Promise.all(body.objects.map(validateObject_1.default));
        const namespaces = await indexObjects_1.default(body.objects);
        await Promise.all(Object.values(namespaces).map(validateNamespace_1.default));
        const entries = await getEntries_1.default(namespaces[body.namespace || "default"]);
        callback(null, entries);
    }
    catch (e) {
        callback(normalizeError_1.default(e));
    }
};
exports.default = handler;
//# sourceMappingURL=getEntries.js.map