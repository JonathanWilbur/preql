"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexObjects_1 = __importDefault(require("../../Commands/indexObjects"));
const handler = async (event, context, callback) => {
    // REVIEW: Handle JSON and YAML strings, too?
    if (!(typeof event === 'object'))
        callback(new Error('Event was not of an object type.'));
    if (!event.objects)
        callback(new Error('Event was supposed to have an `objects` field.'));
    if (typeof event.objects !== 'object')
        callback(new Error('Event.objects should have been an array.'));
    try {
        const namespaces = await indexObjects_1.default(event.objects);
        // See: https://stackoverflow.com/questions/44740423/create-json-string-from-js-map-and-string
        callback(null, JSON.parse(JSON.stringify({
            // namespaces: Array.from(namespaces.entries()),
            namespaces,
            numberOfObjects: event.objects.length,
        }, (key, value) => (value instanceof Map ? [...value] : value))));
    }
    catch (e) {
        callback(e);
    }
};
exports.default = handler;
