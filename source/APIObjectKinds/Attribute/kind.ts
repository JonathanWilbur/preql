import ajv from "../../ajv";
import APIObject from "../../Interfaces/APIObject";
import APIObjectDatabase from "../../Interfaces/APIObjectDatabase";
import APIObjectKind from "../../Interfaces/APIObjectKind";
import PreqlError from "../../PreqlError";
import DataTypeSpec from "../DataType/spec";
import schema from "./schema";
import Spec from "./spec";

const structureValidator = ajv.compile(schema);

/**
 * Represents an atomic piece of data that is associated with an object. In a
 * relational database, this is a column; in a document-oriented database, this
 * might be called a "field."
 */
const kind: APIObjectKind = {
    validateStructure: (obj: APIObject<Spec>): Promise<void> => structureValidator(obj.spec) as Promise<void>,
    validateSemantics: async (obj: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
        const databasePath: string = obj.spec.databaseName.toLowerCase();
        const entityPath: string = `${obj.spec.databaseName}.$${obj.spec.entityName}`.toLowerCase();
        const structPath: string = [obj.spec.databaseName, obj.spec.structName].join(".").toLowerCase();
        const characterSetPath: string = (obj.spec.characterSet || "").toLowerCase();
        const collationPath: string = (obj.spec.collation || "").toLowerCase();

        if (!(etcd.pathIndex[databasePath])) {
            throw new PreqlError(
                "58f2e994-a54a-48e2-8d53-d7015f934beb",
                `No Databases found that are named '${obj.spec.databaseName}' for Attribute `
                + `'${obj.metadata.name}' to attach to.`,
            );
        }
        if (obj.spec.entityName && !etcd.pathIndex[entityPath]) {
            throw new PreqlError(
                "d5b8e0a0-5e69-44bc-8c93-d238c4b3f133",
                `No Entities found that are named '${obj.spec.entityName}' for Attribute `
                + `'${obj.metadata.name}' to be associated with.`,
            );
        }
        if (!etcd.pathIndex[structPath]) {
            throw new PreqlError(
                "1d985193-ce84-4051-a0cc-af9984094d4f",
                `No Structs found that are named '${obj.spec.structName}' for Attribute `
                + `'${obj.metadata.name}' to attach to.`,
            );
        }
        if (obj.spec.characterSet && !etcd.pathIndex[characterSetPath]) {
            throw new PreqlError(
                "9f1e04b9-60bf-4832-ba09-72537231fe1f",
                `No CharacterSets found that are named '${obj.spec.characterSet}' for Attribute `
                + `'${obj.metadata.name}' to use.`,
            );
        }
        if (obj.spec.collation && !etcd.pathIndex[collationPath]) {
            throw new PreqlError(
                "53298ed2-c4cf-41c7-b8fb-bf386388f1b8",
                `No Collations found that are named '${obj.spec.collation}' for Attribute `
                + `'${obj.metadata.name}' to use.`,
            );
        }

        const datatype: APIObject<DataTypeSpec> | undefined = etcd
            .kindNameIndex[`datatype:${obj.spec.type.toLowerCase()}`];
        if (!datatype) {
            throw new PreqlError(
                "6d125c9f-957a-4ce0-9e2a-074ee31fa5f1",
                `No DataTypes found that are named '${obj.spec.type}' for Attribute `
                + `'${obj.metadata.name}' to use.`,
            );
        }
        if (
            (obj.spec.characterSet || obj.spec.collation)
            && datatype.spec.jsonEquivalent.toLowerCase() !== "string"
        ) {
            throw new PreqlError(
                "c939691d-523f-476d-a751-b878a6613a75",
                "Character sets and collations may not apply to Attribute "
                + `'${obj.metadata.name}', because it is not fundamentally a `
                + "string type.",
            );
        }
    },
};

export default kind;
