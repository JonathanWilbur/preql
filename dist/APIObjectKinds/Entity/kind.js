"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("../../ajv"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const schema_1 = __importDefault(require("./schema"));
const structureValidator = ajv_1.default.compile(schema_1.default);
const kind = {
    validateStructure: (obj) => structureValidator(obj.spec),
    validateSemantics: async (obj, etcd) => {
        if (!etcd.pathIndex[obj.spec.databaseName.toLowerCase()]) {
            throw new PreqlError_1.default("eacff4b7-03b2-4495-8153-6f75ddff8854", `No Databases found that are named '${obj.spec.databaseName}' for Entity `
                + `'${obj.metadata.name}' to attach to.`);
        }
        if (!etcd.pathIndex[`${obj.spec.databaseName}.${obj.spec.rootStruct}`.toLowerCase()]) {
            throw new PreqlError_1.default("3498526b-f3f4-4c6a-9484-7972d1cc4c29", `No Structs found that are named '${obj.spec.rootStruct}' for Entity `
                + `'${obj.metadata.name}' to use as the root Struct.`);
        }
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map