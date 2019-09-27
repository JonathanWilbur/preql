"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("../../ajv"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const schema_1 = __importDefault(require("./schema"));
const structureValidator = ajv_1.default.compile(schema_1.default);
/**
 * An object in the real world that is represented by one or more `Struct`s.
 *
 * In a relational database, an `Entity` is virtually meaningless, because
 * relational databases only use structurally rigid tables of data that are
 * innately limited in their ability to describe real world objects alone,
 * but many Object-Relational Mapping (ORM) libraries have the ability to
 * transform these tables into more complex objects in memory or on disk,
 * which are often referred to as "entities." This API object kind describes
 * such entities.
 *
 * In document-oriented databases, this maps to a whole document, whereas
 * each subdocument is a `Struct`, and the document itself is indicated by
 * the `rootStruct` field of the `Entity` API object.
 *
 * @see /source/APIObjectKinds/Struct/kind.
 */
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