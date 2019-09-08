import ajv from "../../ajv";
import APIObject from "../../Interfaces/APIObject";
import APIObjectKind from "../../Interfaces/APIObjectKind";
import schema from "./schema";
import Spec from "./spec";

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
    validateStructure: (obj: APIObject<Spec>): Promise<void> => structureValidator(obj.spec) as Promise<void>,
    validateSemantics: (): Promise<void> => Promise.resolve(),
};

export default kind;
