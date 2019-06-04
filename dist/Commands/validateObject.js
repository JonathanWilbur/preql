"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIObject_1 = __importDefault(require("../JSONSchema/APIObject"));
const APIObjectKinds_1 = __importDefault(require("../APIObjectKinds"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(APIObject_1.default);
/**
 * Resolves a boolean indicating whether the `spec` field has been validated.
 * A resolution of `false` means that just the header was validated, but it was
 * valid. Rejects if any part of the object is invalid.
 *
 * @param apiObject The object to be structurally validated.
 */
async function validateStructure(apiObject) {
    const kind = APIObjectKinds_1.default[apiObject.kind.toLowerCase()];
    if (!kind)
        return Promise.resolve(false);
    await Promise.all([
        structureValidator(apiObject),
        kind.validateStructure(apiObject),
    ]);
    return Promise.resolve(true);
}
exports.default = validateStructure;
;