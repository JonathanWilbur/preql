import ajv from "../../ajv";
import APIObject from "../../Interfaces/APIObject";
import APIObjectDatabase from "../../Interfaces/APIObjectDatabase";
import APIObjectKind from "../../Interfaces/APIObjectKind";
import PreqlError from "../../PreqlError";
import prohibitedIdentifiers from "../../prohibitedIdentifiers";
import schema from "./schema";
import Spec from "./spec";

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
    validateStructure: (obj: APIObject<Spec>): Promise<void> => structureValidator(obj.spec) as Promise<void>,
    validateSemantics: async (obj: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
        if (prohibitedIdentifiers.indexOf(obj.spec.name) !== -1) {
            throw new PreqlError(
                "74935c2f-ff54-42dc-923d-c66f1c9adcb2",
                `Attribute name '${obj.spec.name}' is prohibited.`,
            );
        }

        const databasePath: string = obj.spec.databaseName.toLowerCase();
        const childStructPath: string = `${obj.spec.databaseName}.${obj.spec.childStructName}`.toLowerCase();
        const parentStructPath: string = `${obj.spec.databaseName}.${obj.spec.parentStructName}`.toLowerCase();

        if (!etcd.pathIndex[databasePath]) {
            throw new PreqlError(
                "b8fa5bfb-0033-45ec-b455-44ca82be6c46",
                `No Databases found that are named '${obj.spec.databaseName}' for ${obj.kind} `
                + `'${obj.metadata.name}' to attach to.`,
            );
        }
        if (!etcd.pathIndex[childStructPath]) {
            throw new PreqlError(
                "797317ff-ac7e-421f-92ce-e476624c04cc",
                `No Structs found that are named '${obj.spec.childStructName}' for ${obj.kind} `
                + `'${obj.metadata.name}' to attach to.`,
            );
        }
        if (!etcd.pathIndex[parentStructPath]) {
            throw new PreqlError(
                "9a15aca4-830c-4b30-bc6b-af76b5b663df",
                `No Structs found that are named '${obj.spec.parentStructName}' for ${obj.kind} `
                + `'${obj.metadata.name}' to attach to.`,
            );
        }
    },
};

export default kind;
