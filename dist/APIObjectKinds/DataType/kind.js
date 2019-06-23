"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const ajv_1 = __importDefault(require("../../ajv"));
const structureValidator = ajv_1.default.compile(schema_1.default);
const kind = {
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject) => {
        if (apiObject.spec.regexes && apiObject.spec.jsonEquivalent.toLowerCase() !== 'string') {
            throw new PreqlError_1.default('2abf0f1e-601e-4051-9b66-b6280564093f', `Regexes may not be used in data type '${apiObject.metadata.name}', `
                + 'because it is not fundamentally string-like.');
        }
        // Validate regexes
        if (apiObject.spec.regexes && apiObject.spec.regexes.pcre) {
            Object.entries(apiObject.spec.regexes.pcre)
                .forEach((group) => {
                group[1].forEach((re, index) => {
                    try {
                        // eslint-disable-next-line
                        new RegExp(re.pattern);
                    }
                    catch (e) {
                        throw new PreqlError_1.default('9f65eaff-b915-4889-9d6c-8e3a757b5b4e', `Invalid regular expression for data type '${apiObject.metadata.name}'. `
                            + `Group '${group[0]}', index: ${index}.`);
                    }
                });
            });
        }
        // Ensure every target has either return or returnBasedOnLength
        Object.entries(apiObject.spec.targets)
            .forEach((target) => {
            if (!(target[1].return) && !(target[1].returnBasedOnLength)) {
                throw new PreqlError_1.default('faa52d5c-f397-4e2c-9d9b-bb05cf4428a8', `Data type '${apiObject.metadata.name}' must have either `
                    + "a 'return' or 'returnBasedOnLength' field.");
            }
        });
    },
};
exports.default = kind;
