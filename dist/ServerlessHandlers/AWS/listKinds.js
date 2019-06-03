"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../APIObjectKinds/index"));
const handler = async (event, context, callback) => {
    // REVIEW: Handle JSON and YAML strings, too?
    if (!(typeof event === 'object'))
        callback(new Error('Event was not of an object type.'));
    try {
        callback(null, {
            kinds: Array.from(index_1.default.keys()),
        });
    }
    catch (e) {
        callback(e);
    }
};
exports.default = handler;
