import ajv from "../../ajv";
import APIObject from "../../Interfaces/APIObject";
import APIObjectKind from "../../Interfaces/APIObjectKind";
import validateIndex from "../validateIndex";
import schema from "./schema";
import Spec from "./spec";

const structureValidator = ajv.compile(schema);

/**
 * Represents a pre-sorting of data on the basis of selected `Attribute`s in a
 * DBMS to speed up queries, but with an additional constraint that all
 * instances of a `Struct` in a DBMS have unique values for the indexed
 * `Attribute`.
 */
const kind: APIObjectKind = {
    validateStructure: (obj: APIObject<Spec>): Promise<void> => structureValidator(obj.spec) as Promise<void>,
    validateSemantics: validateIndex,
};

export default kind;
