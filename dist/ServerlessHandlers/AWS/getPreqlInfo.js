"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPreqlInfo_1 = __importDefault(require("../../Commands/getPreqlInfo"));
function handler() {
    return getPreqlInfo_1.default();
}
exports.default = handler;
;
