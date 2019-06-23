"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matchLabels_1 = __importDefault(require("../../Commands/matchLabels"));
const normalizeError_1 = __importDefault(require("../../normalizeError"));
const handler = async (event, context, callback) => {
    if (!(typeof event === 'object'))
        callback(new Error('Event was not of an object type.'));
    try {
        callback(null, matchLabels_1.default(event.labels, event.apiObject));
    }
    catch (e) {
        callback(normalizeError_1.default(e));
    }
};
exports.default = handler;
