"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const ajv_1 = __importDefault(require("../../ajv"));
const structureValidator = ajv_1.default.compile(schema_1.default);
/**
 * Represents a way of encoding a type of data in digital storage. More
 * precisely, it is a rule for a computer on how to store and interpret
 * bytes of data.
 */
const kind = {
    validateStructure: (obj) => structureValidator(obj.spec),
    validateSemantics: async (obj) => {
        // Validate regexes
        if (obj.spec.regexes && obj.spec.regexes.pcre) {
            Object.entries(obj.spec.regexes.pcre)
                .forEach((group) => {
                group[1].forEach((re, index) => {
                    try {
                        // eslint-disable-next-line
                        new RegExp(re.pattern);
                    }
                    catch (e) {
                        throw new PreqlError_1.default("9f65eaff-b915-4889-9d6c-8e3a757b5b4e", `Invalid regular expression for data type '${obj.metadata.name}'. `
                            + `Group '${group[0]}', index: ${index}.`);
                    }
                });
            });
        }
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map