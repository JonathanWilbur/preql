"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIObject_1 = __importDefault(require("../JSONSchema/APIObject"));
const APIObjectKinds_1 = __importDefault(require("../APIObjectKinds"));
const ajv_1 = __importDefault(require("../ajv"));
const prohibitedIdentifiers_1 = __importDefault(require("../prohibitedIdentifiers"));
const PreqlError_1 = __importDefault(require("../PreqlError"));
const structureValidator = ajv_1.default.compile(APIObject_1.default);
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
    await structureValidator(apiObject);
    try {
        await kind.validateStructure(apiObject);
    }
    catch (e) {
        throw new PreqlError_1.default('9bf4d422-e409-4f00-99f7-ac8cd4954175', `${apiObject.kind} '${apiObject.metadata.name}' failed structural `
            + `validation. ${e.message} ${e.errors || ''}`);
    }
    if (prohibitedIdentifiers_1.default.indexOf(apiObject.metadata.name) !== -1) {
        throw new PreqlError_1.default('ed7558d6-61b8-44e5-ae73-8feaf60404de', `Metadata name '${apiObject.metadata.name}' is prohibited.`);
    }
    return Promise.resolve(true);
}
exports.default = validateStructure;
;
