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
 * A collection of a finite number of `Attribute`s that describes a category
 * of `Entry`. In a relational database, this is a table. In a
 * document-oriented database, this may be a "document" or "subdocument."
 * In JSON, this is referred to as an "object." It does not describe an
 * instance of something, but a category of an instance.
 */
const kind = {
    validateStructure: (obj) => structureValidator(obj.spec),
    validateSemantics: async (obj, etcd) => {
        const databasePath = obj.spec.databaseName.toLowerCase();
        const entityPath = `${obj.spec.databaseName}.$${obj.spec.entityName}`.toLowerCase();
        const characterSetPath = (obj.spec.characterSet || "").toLowerCase();
        const collationPath = (obj.spec.collation || "").toLowerCase();
        if (!etcd.pathIndex[databasePath]) {
            throw new PreqlError_1.default("3d98139e-db3d-42de-83a7-1ef389c6ed2c", `No Databases found that are named '${obj.spec.databaseName}' for Struct `
                + `'${obj.metadata.name}' to attach to.`);
        }
        if (obj.spec.entityName && !etcd.pathIndex[entityPath]) {
            throw new PreqlError_1.default("6fe4e182-ef83-48a4-a282-2a418009174c", `No Entities found that are named '${obj.spec.entityName}' for Struct `
                + `'${obj.metadata.name}' to be associated with.`);
        }
        const attributeFound = (etcd.kindIndex.attribute || [])
            .some((attr) => (attr.spec.databaseName === obj.spec.databaseName
            && attr.spec.structName === obj.spec.name));
        const foreignKeyFound = (etcd.kindIndex.foreignkey || [])
            .some((attr) => (attr.spec.databaseName === obj.spec.databaseName
            && attr.spec.childStructName === obj.spec.name));
        if (!attributeFound && !foreignKeyFound) {
            throw new PreqlError_1.default("2affcfab-2f7b-46be-84cf-4797dc8be7a6", "No Attributes or ForeignKeys found for Struct"
                + `'${obj.metadata.name}'. Every Struct must have at least `
                + "one Attribute or ForeignKey.");
        }
        if (obj.spec.characterSet && !etcd.pathIndex[characterSetPath]) {
            throw new PreqlError_1.default("0d5be372-5fb4-401e-869b-06f5108d9f2b", `No CharacterSets found that are named '${obj.spec.characterSet}' for Struct `
                + `'${obj.metadata.name}' to use.`);
        }
        if (obj.spec.collation && !etcd.pathIndex[collationPath]) {
            throw new PreqlError_1.default("33313e20-bf74-4aa9-8c0a-a8e2637b5d4e", `No Collations found that are named '${obj.spec.collation}' for Struct `
                + `'${obj.metadata.name}' to use.`);
        }
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map