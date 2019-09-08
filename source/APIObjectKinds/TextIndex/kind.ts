import ajv from "../../ajv";
import APIObject from "../../Interfaces/APIObject";
import APIObjectDatabase from "../../Interfaces/APIObjectDatabase";
import APIObjectKind from "../../Interfaces/APIObjectKind";
import PreqlError from "../../PreqlError";
import AttributeSpec from "../Attribute/spec";
import DataTypeSpec from "../DataType/spec";
import schema from "./schema";
import Spec from "./spec";

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
    validateStructure: (obj: APIObject<Spec>): Promise<void> => structureValidator(obj.spec) as Promise<void>,
    validateSemantics: async (obj: APIObject, etcd: APIObjectDatabase): Promise<void> => {
        const databasePath: string = obj.spec.databaseName.toLowerCase();
        const entityPath: string = `${obj.spec.databaseName}.$${obj.spec.entityName}`.toLowerCase();
        const structPath: string = [obj.spec.databaseName, obj.spec.structName].join(".").toLowerCase();

        if (!etcd.pathIndex[databasePath]) {
            throw new PreqlError(
                "37caf6cd-29d8-45ef-8697-f73ce1ee23ae",
                `No Databases found that are named '${obj.spec.databaseName}' for ${obj.kind} `
                + `'${obj.metadata.name}' to attach to.`,
            );
        }
        if (obj.spec.entityName && !etcd.pathIndex[entityPath]) {
            throw new PreqlError(
                "8f3b2610-3308-4b65-b180-ead4f452c9c1",
                `No Entities found that are named '${obj.spec.entityName}' for ${obj.kind} `
                + `'${obj.metadata.name}' to be associated with.`,
            );
        }
        if (!etcd.pathIndex[structPath]) {
            throw new PreqlError(
                "bc7692ff-9eb1-4258-b9ac-d95b1448153f",
                `No Structs found that are named '${obj.spec.structName}' for ${obj.kind} `
                + `'${obj.metadata.name}' to attach to.`,
            );
        }

        const attributes: APIObject<AttributeSpec>[] | undefined = etcd.kindIndex.attribute;
        if (!attributes) {
            throw new PreqlError(
                "fbee0ffc-6969-4548-bd8d-72a5c189e0e6",
                `No Attributes found for ${obj.kind} '${obj.metadata.name}' to index.`,
            );
        }
        // Check that the attributes are real and of string-ish type
        obj.spec.keyAttributes.forEach((kc: any): void => {
            const attribute: APIObject<AttributeSpec> | undefined = attributes
                .find((attr): boolean => attr.spec.name === kc.name);
            if (!attribute) {
                throw new PreqlError(
                    "9a72cd18-9b32-4f4e-806f-dd9ba85e02c8",
                    `No Attribute named '${kc.name}' for ${obj.kind} `
                    + `'${obj.metadata.name}' to index.`,
                );
            }
            const kindAndName: string = `datatype:${attribute.spec.type.toLowerCase()}`;
            const dataType: APIObject<DataTypeSpec> | undefined = etcd.kindNameIndex[kindAndName];
            if (!dataType) {
                throw new PreqlError(
                    "06fc9208-5772-47d6-8747-dffa6ac58d42",
                    `No such DataType '${attribute.spec.type}'.`,
                );
            }
            if (dataType.spec.jsonEquivalent !== "string") {
                throw new PreqlError(
                    "8ab69478-d407-4a60-95ce-d3dd248cc5ce",
                    `TextIndex '${obj.metadata.name}' cannot use Attribute `
                    + `'${attribute.metadata.name}' because it DataType `
                    + `'${dataType.metadata.name}' is not fundamentally string-like, `
                    + "as determined by the DataType's `jsonEquivalent` property.",
                );
            }
        });
    },
};

export default kind;
