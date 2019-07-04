"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const ajv_1 = __importDefault(require("../../ajv"));
const matchingResource_1 = __importDefault(require("../matchingResource"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const structureValidator = ajv_1.default.compile(schema_1.default);
const kind = {
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        if (apiObject.spec.defaultCollation && !matchingResource_1.default(apiObject.spec.defaultCollation, 'collation', etcd)) {
            throw new PreqlError_1.default('359299a4-d4f3-45c2-a4e0-e4d9064d3c76', `No Collations found that are named '${apiObject.spec.defaultCollation}' `
                + `to be the default collation for CharacterSet '${apiObject.metadata.name}'.`);
        }
    },
};
exports.default = kind;
