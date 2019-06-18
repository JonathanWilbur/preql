"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateObject_1 = __importDefault(require("../../Commands/validateObject"));
const validateNamespace_1 = __importDefault(require("../../Commands/validateNamespace"));
const indexObjects_1 = __importDefault(require("../../Commands/indexObjects"));
const getTree_1 = __importDefault(require("../../Commands/getTree"));
const normalizeError_1 = __importDefault(require("../../normalizeError"));
const handler = async (event, context, callback) => {
    // REVIEW: Handle JSON and YAML strings, too?
    if (!(typeof event === 'object'))
        callback(new Error('Event was not of an object type.'));
    if (!event.objects)
        callback(new Error('Event was supposed to have an `objects` field.'));
    try {
        await Promise.all(event.objects.map(validateObject_1.default));
        const namespaces = await indexObjects_1.default(event.objects);
        await Promise.all(Object.values(namespaces).map(validateNamespace_1.default));
        const tree = await getTree_1.default(namespaces);
        callback(null, tree);
    }
    catch (e) {
        callback(normalizeError_1.default(e));
    }
};
exports.default = handler;
