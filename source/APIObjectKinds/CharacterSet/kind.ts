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
        if (!(obj.spec.defaultCollation)) return;
        if (!etcd.pathIndex[obj.spec.defaultCollation.toLowerCase()]) {
            throw new PreqlError(
                "359299a4-d4f3-45c2-a4e0-e4d9064d3c76",
                `No Collations found that are named '${obj.spec.defaultCollation}' `
        + `to be the default collation for CharacterSet '${obj.metadata.name}'.`,
            );
        }
    },
};

export default kind;
