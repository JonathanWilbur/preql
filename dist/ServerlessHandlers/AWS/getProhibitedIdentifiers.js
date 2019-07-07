"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getProhibitedIdentifiers_1 = __importDefault(require("../../Commands/getProhibitedIdentifiers"));
const handler = async (event, context, callback) => {
    callback(null, getProhibitedIdentifiers_1.default());
};
exports.default = handler;
