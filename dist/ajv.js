"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajvOptions_1 = __importDefault(require("./ajvOptions"));
const Ajv = require("ajv");
const ajv = new Ajv(ajvOptions_1.default);
ajv.addKeyword('unicodePattern', {
    // eslint-disable-next-line
    validate: (schema, data) => (typeof schema === 'string' && typeof data === 'string'
        ? (new RegExp(schema, 'u')).test(data) : false),
    async: true,
    errors: false,
});
exports.default = ajv;
//# sourceMappingURL=ajv.js.map