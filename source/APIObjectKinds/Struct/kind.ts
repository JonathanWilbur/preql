import ajv from "../../ajv";
import APIObject from "../../Interfaces/APIObject";
import APIObjectDatabase from "../../Interfaces/APIObjectDatabase";
import APIObjectKind from "../../Interfaces/APIObjectKind";
import PreqlError from "../../PreqlError";
import AttributeSpec from "../Attribute/spec";
import ForeignKeySpec from "../ForeignKey/spec";
import schema from "./schema";
import Spec from "./spec";

const structureValidator = ajv.compile(schema);

/**
 * A collection of a finite number of `Attribute`s that describes a category
 * of `Entry`. In a relational database, this is a table. In a
 * document-oriented database, this may be a "document" or "subdocument."
 * In JSON, this is referred to as an "object." It does not describe an
 * instance of something, but a category of an instance.
 */
const kind: APIObjectKind = {
    validateStructure: (obj: APIObject<Spec>): Promise<void> => structureValidator(obj.spec) as Promise<void>,
    validateSemantics: async (obj: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
        const databasePath: string = obj.spec.databaseName.toLowerCase();
        const entityPath: string = `${obj.spec.databaseName}.$${obj.spec.entityName}`.toLowerCase();
        const characterSetPath: string = (obj.spec.characterSet || "").toLowerCase();
        const collationPath: string = (obj.spec.collation || "").toLowerCase();

        if (!etcd.pathIndex[databasePath]) {
            throw new PreqlError(
                "3d98139e-db3d-42de-83a7-1ef389c6ed2c",
                `No Databases found that are named '${obj.spec.databaseName}' for Struct `
                + `'${obj.metadata.name}' to attach to.`,
            );
        }
        if (obj.spec.entityName && !etcd.pathIndex[entityPath]) {
            throw new PreqlError(
                "6fe4e182-ef83-48a4-a282-2a418009174c",
                `No Entities found that are named '${obj.spec.entityName}' for Struct `
                + `'${obj.metadata.name}' to be associated with.`,
            );
        }
        const attributeFound: boolean = (etcd.kindIndex.attribute || [])
            .some((attr: APIObject<AttributeSpec>): boolean => (
                attr.spec.databaseName === obj.spec.databaseName
                && attr.spec.structName === obj.spec.name
            ));
        const foreignKeyFound: boolean = (etcd.kindIndex.foreignkey || [])
            .some((attr: APIObject<ForeignKeySpec>): boolean => (
                attr.spec.databaseName === obj.spec.databaseName
                && attr.spec.childStructName === obj.spec.name
            ));
        if (!attributeFound && !foreignKeyFound) {
            throw new PreqlError(
                "2affcfab-2f7b-46be-84cf-4797dc8be7a6",
                "No Attributes or ForeignKeys found for Struct"
                + `'${obj.metadata.name}'. Every Struct must have at least `
                + "one Attribute or ForeignKey.",
            );
        }
        if (obj.spec.characterSet && !etcd.pathIndex[characterSetPath]) {
            throw new PreqlError(
                "0d5be372-5fb4-401e-869b-06f5108d9f2b",
                `No CharacterSets found that are named '${obj.spec.characterSet}' for Struct `
                + `'${obj.metadata.name}' to use.`,
            );
        }
        if (obj.spec.collation && !etcd.pathIndex[collationPath]) {
            throw new PreqlError(
                "33313e20-bf74-4aa9-8c0a-a8e2637b5d4e",
                `No Collations found that are named '${obj.spec.collation}' for Struct `
                + `'${obj.metadata.name}' to use.`,
            );
        }
    },
};

export default kind;
