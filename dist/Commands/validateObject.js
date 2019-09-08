"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("../ajv"));
const APIObjectKinds_1 = __importDefault(require("../APIObjectKinds"));
const APIObject_1 = __importDefault(require("../JSONSchema/APIObject"));
const PreqlError_1 = __importDefault(require("../PreqlError"));
const prohibitedIdentifiers_1 = __importDefault(require("../prohibitedIdentifiers"));
const structureValidator = ajv_1.default.compile(APIObject_1.default);
/**
 * Resolves a boolean indicating whether the `spec` field has been validated.
 * A resolution of `false` means that just the header was validated, but it was
 * valid. Rejects if any part of the object is invalid.
 *
 * @param obj The object to be structurally validated.
 */
async function validateObject(obj) {
    const kind = APIObjectKinds_1.default[obj.kind.toLowerCase()];
    if (!kind)
        return Promise.resolve(false);
    await structureValidator(obj);
    try {
        await kind.validateStructure(obj);
    }
    catch (err) {
        throw new PreqlError_1.default("9bf4d422-e409-4f00-99f7-ac8cd4954175", `${obj.kind} '${obj.metadata.name}' failed structural `
            + `validation. ${err.message} ${(err.errors || []).map((e) => e.message).join("; ")}`);
    }
    if (prohibitedIdentifiers_1.default.indexOf(obj.metadata.name) !== -1) {
        throw new PreqlError_1.default("ed7558d6-61b8-44e5-ae73-8feaf60404de", `Metadata name '${obj.metadata.name}' is prohibited.`);
    }
    if (obj.spec.name && (prohibitedIdentifiers_1.default.indexOf(obj.spec.name) !== -1)) {
        throw new PreqlError_1.default("1d3adbad-aaaa-4601-b95b-11892bc4bed9", `Spec name '${obj.spec.name}' is prohibited.`);
    }
    return true;
}
exports.default = validateObject;
//# sourceMappingURL=validateObject.js.map