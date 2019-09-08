import ajv from "../../ajv";
import APIObject from "../../Interfaces/APIObject";
import APIObjectDatabase from "../../Interfaces/APIObjectDatabase";
import APIObjectKind from "../../Interfaces/APIObjectKind";
import PreqlError from "../../PreqlError";
import schema from "./schema";
import Spec from "./spec";

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
    validateStructure: (obj: APIObject<Spec>): Promise<void> => structureValidator(obj.spec) as Promise<void>,
    validateSemantics: async (obj: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
        if (!(obj.spec.characterSet)) return;
        if (!etcd.pathIndex[obj.spec.characterSet.toLowerCase()]) {
            throw new PreqlError(
                "f191539e-7758-4a56-81ea-bba873dbfad1",
                `No CharacterSet found that is named '${obj.spec.characterSet}' `
        + `to be for CharacterSet for Collation '${obj.metadata.name}'.`,
            );
        }
    },
};

export default kind;
