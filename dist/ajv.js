"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
ajv.addKeyword('unicodePattern', {
    // eslint-disable-next-line
    validate: (schema, data) => (typeof schema === 'string' && typeof data === 'string'
        ? (new RegExp(schema, 'u')).test(data) : false),
    async: true,
    errors: false,
});
exports.default = ajv;
