import APIObject from "../../Interfaces/APIObject";
import APIObjectKind from "../../Interfaces/APIObjectKind";
import schema from "./schema";
import Spec from "./spec";
import validateIndex from "../validateIndex";
import ajv from "../../ajv";

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
    validateStructure: (obj: APIObject<Spec>): Promise<void> => structureValidator(obj.spec) as Promise<void>,
    validateSemantics: validateIndex,
};

export default kind;
