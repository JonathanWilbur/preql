"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const ajv_1 = __importDefault(require("../../ajv"));
const prohibitedIdentifiers_1 = __importDefault(require("../../prohibitedIdentifiers"));
const structureValidator = ajv_1.default.compile(schema_1.default);
const kind = {
    validateStructure: (obj) => structureValidator(obj.spec),
    validateSemantics: async (obj, etcd) => {
        if (prohibitedIdentifiers_1.default.indexOf(obj.spec.name) !== -1) {
            throw new PreqlError_1.default('74935c2f-ff54-42dc-923d-c66f1c9adcb2', `Attribute name '${obj.spec.name}' is prohibited.`);
        }
        const databasePath = obj.spec.databaseName.toLowerCase();
        const childStructPath = `${obj.spec.databaseName}.${obj.spec.childStructName}`.toLowerCase();
        const parentStructPath = `${obj.spec.databaseName}.${obj.spec.parentStructName}`.toLowerCase();
        if (!etcd.pathIndex[databasePath]) {
            throw new PreqlError_1.default('b8fa5bfb-0033-45ec-b455-44ca82be6c46', `No Databases found that are named '${obj.spec.databaseName}' for ${obj.kind} `
                + `'${obj.metadata.name}' to attach to.`);
        }
        if (!etcd.pathIndex[childStructPath]) {
            throw new PreqlError_1.default('797317ff-ac7e-421f-92ce-e476624c04cc', `No Structs found that are named '${obj.spec.childStructName}' for ${obj.kind} `
                + `'${obj.metadata.name}' to attach to.`);
        }
        if (!etcd.pathIndex[parentStructPath]) {
            throw new PreqlError_1.default('9a15aca4-830c-4b30-bc6b-af76b5b663df', `No Structs found that are named '${obj.spec.parentStructName}' for ${obj.kind} `
                + `'${obj.metadata.name}' to attach to.`);
        }
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map