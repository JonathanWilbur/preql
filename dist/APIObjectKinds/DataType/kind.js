"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const ajv_1 = __importDefault(require("../../ajv"));
const matchingResource_1 = __importDefault(require("../matchingResource"));
const structureValidator = ajv_1.default.compile(schema_1.default);
const kind = {
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        if (apiObject.spec.enum) {
            if (!matchingResource_1.default(apiObject.spec.enum, 'enum', etcd)) {
                throw new PreqlError_1.default('d334114a-aa1c-4584-848c-3dca05169c16', `No Enums found that are named '${apiObject.spec.enum}' for DataType `
                    + `'${apiObject.metadata.name}' to use.`);
            }
            if (apiObject.spec.jsonEquivalent === 'string') {
                throw new PreqlError_1.default('1528258b-27b1-4e5d-bfff-2486e09fd1b3', `DataType '${apiObject.metadata.name}' may not have an 'enum' field `
                    + 'because it is not fundamentally string-like.');
            }
            if (apiObject.spec.regexes) {
                throw new PreqlError_1.default('34e7586b-a5ec-4883-884a-ad19080b7345', `DataType '${apiObject.metadata.name}' may not have an 'enum' and `
                    + "'regexes' field at the same time.");
            }
            if (apiObject.spec.setters) {
                throw new PreqlError_1.default('1d75f6ca-7c97-476e-8b23-bf30099c01bd', `DataType '${apiObject.metadata.name}' may not have an 'enum' and `
                    + "'setters' field at the same time.");
            }
        }
        if (apiObject.spec.regexes && apiObject.spec.jsonEquivalent.toLowerCase() !== 'string') {
            throw new PreqlError_1.default('2abf0f1e-601e-4051-9b66-b6280564093f', `Regexes may not be used in data type '${apiObject.metadata.name}', `
                + 'because it is not fundamentally string-like.');
        }
        if (apiObject.spec.setters && apiObject.spec.jsonEquivalent.toLowerCase() !== 'string') {
            throw new PreqlError_1.default('68dc3bb0-b3ae-46ff-b003-17e1cac35e1f', `Setters may not be used in data type '${apiObject.metadata.name}', `
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
