"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const matchingResource_1 = __importDefault(require("../matchingResource"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const ajv_1 = __importDefault(require("../../ajv"));
const structureValidator = ajv_1.default.compile(schema_1.default);
const kind = {
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
            throw new PreqlError_1.default('eacff4b7-03b2-4495-8153-6f75ddff8854', `No Databases found that are named '${apiObject.spec.databaseName}' for Entity `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (!matchingResource_1.default(apiObject.spec.rootStruct, 'struct', etcd)) {
            throw new PreqlError_1.default('3498526b-f3f4-4c6a-9484-7972d1cc4c29', `No Structs found that are named '${apiObject.spec.rootStruct}' for Entity `
                + `'${apiObject.metadata.name}' to use as the root Struct.`);
        }
    },
};
exports.default = kind;
