"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateObject_1 = __importDefault(require("../../Commands/validateObject"));
const validateNamespace_1 = __importDefault(require("../../Commands/validateNamespace"));
const indexObjects_1 = __importDefault(require("../../Commands/indexObjects"));
const normalizeError_1 = __importDefault(require("../../normalizeError"));
const handler = async (event, context, callback) => {
    if (!(typeof event === 'object'))
        callback(new Error('Event was not of an object type.'));
    if (typeof event.objects !== 'object' || !Array.isArray(event.objects)) {
        callback(new Error('Event was supposed to have an `objects` array.'));
        return;
    }
    if (event.objects.length === 0) {
        callback(null, {
            namespaces: {},
            numberOfObjects: 0,
            valid: true,
        });
        return;
    }
    try {
        await Promise.all(event.objects.map(validateObject_1.default));
        const namespaces = await indexObjects_1.default(event.objects);
        await Promise.all(Object.values(namespaces).map(validateNamespace_1.default));
        callback(null, {
            namespaces,
            numberOfObjects: event.objects.length,
            valid: true,
        });
    }
    catch (e) {
        callback(normalizeError_1.default(e));
    }
};
exports.default = handler;
