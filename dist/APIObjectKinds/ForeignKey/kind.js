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
            throw new PreqlError_1.default('b8fa5bfb-0033-45ec-b455-44ca82be6c46', `No Databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (!matchingResource_1.default(apiObject.spec.childStruct, 'struct', etcd)) {
            throw new PreqlError_1.default('797317ff-ac7e-421f-92ce-e476624c04cc', `No Structs found that are named '${apiObject.spec.childStruct}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (!matchingResource_1.default(apiObject.spec.parentStruct, 'struct', etcd)) {
            throw new PreqlError_1.default('9a15aca4-830c-4b30-bc6b-af76b5b663df', `No Structs found that are named '${apiObject.spec.parentStruct}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
    },
};
exports.default = kind;
