"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kind_1 = __importDefault(require("./Namespace/kind"));
const kind_2 = __importDefault(require("./Entity/kind"));
const kind_3 = __importDefault(require("./Struct/kind"));
const kind_4 = __importDefault(require("./Attribute/kind"));
const kind_5 = __importDefault(require("./PrimaryIndex/kind"));
exports.default = new Map([
    ['namespace', kind_1.default],
    ['entity', kind_2.default],
    ['struct', kind_3.default],
    ['attribute', kind_4.default],
    ['primaryindex', kind_5.default],
]);
