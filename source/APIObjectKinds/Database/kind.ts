import ajv from "../../ajv";
import APIObject from "../../Interfaces/APIObject";
import APIObjectDatabase from "../../Interfaces/APIObjectDatabase";
import APIObjectKind from "../../Interfaces/APIObjectKind";
import PreqlError from "../../PreqlError";
import schema from "./schema";
import Spec from "./spec";

const structureValidator = ajv.compile(schema);

/**
 * Represents a virtually isolated, but not necessarily physically isolated,
 * store of data that exists within a DBMS. Such stores of data are may have
 * constraints between objects, such as `Attribute`s or `Struct`s within them,
 * but are generally independent of other such objects in other databases.
 *
 * In relational databases, these are sometimes called "schema."
 */
const kind: APIObjectKind = {
    validateStructure: (obj: APIObject<Spec>): Promise<void> => structureValidator(obj.spec) as Promise<void>,
    validateSemantics: async (obj: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    // Validate CharacterSet
        if (obj.spec.characterSet && !etcd.pathIndex[obj.spec.characterSet.toLowerCase()]) {
            throw new PreqlError(
                "e4d5bf3b-1063-42dd-8ce6-15e6f98fbb5f",
                `No CharacterSets found that are named '${obj.spec.characterSet}' for Database `
                + `'${obj.metadata.name}' to use.`,
            );
        }

        // Validate Collation
        if (obj.spec.collation && !etcd.pathIndex[obj.spec.collation.toLowerCase()]) {
            throw new PreqlError(
                "a3cc2f42-099f-43ee-be57-c8d2aa842712",
                `No Collations found that are named '${obj.spec.collation}' for Database `
                + `'${obj.metadata.name}' to use.`,
            );
        }
    },
};

export default kind;
