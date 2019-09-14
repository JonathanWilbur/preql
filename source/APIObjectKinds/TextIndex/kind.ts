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

/**
 * Represents a pre-sorting of data on the basis of selected textual
 * `Attribute`s in a DBMS on the basis of the words or phrases they contain
 * to speed up queries.
 */
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

        obj.spec.keyAttributes
            .map((attr: { name: string; ascending: boolean }): string => (
                `${obj.spec.databaseName}.${obj.spec.structName}.${attr.name}`.toLowerCase()
            ))
            .forEach((path: string): void => {
                const attr: APIObject<AttributeSpec> = etcd.pathIndex[path];
                if (!attr) {
                    throw new PreqlError(
                        "d80009c9-894d-4c0f-8871-1335e826cf16",
                        `Attribute with path '${path}' not found for ${obj.kind} `
                        + `'${obj.metadata.name}' to index.`,
                    );
                }
                const kindAndName: string = `datatype:${attr.spec.type.toLowerCase()}`;
                const dataType: APIObject<DataTypeSpec> | undefined = etcd.kindNameIndex[kindAndName];
                if (!dataType) {
                    throw new PreqlError(
                        "06fc9208-5772-47d6-8747-dffa6ac58d42",
                        `No such DataType '${attr.spec.type}'.`,
                    );
                }
                if (dataType.spec.jsonEquivalent !== "string") {
                    throw new PreqlError(
                        "8ab69478-d407-4a60-95ce-d3dd248cc5ce",
                        `TextIndex '${obj.metadata.name}' cannot use Attribute `
                        + `'${attr.metadata.name}' because it DataType `
                        + `'${dataType.metadata.name}' is not fundamentally string-like, `
                        + "as determined by the DataType's `jsonEquivalent` property.",
                    );
                }
            });

        if (obj.spec.includedAttributes) {
            obj.spec.includedAttributes
                .map((attr: { name: string; ascending: boolean }): string => (
                    `${obj.spec.databaseName}.${obj.spec.structName}.${attr.name}`.toLowerCase()
                ))
                .forEach((path: string): void => {
                    const attr: APIObject<AttributeSpec> = etcd.pathIndex[path];
                    if (!attr) {
                        throw new PreqlError(
                            "e1b74181-e619-459f-850b-28731f243610",
                            `Attribute with path '${path}' not found for ${obj.kind} `
                            + `'${obj.metadata.name}' to include.`,
                        );
                    }
                    const kindAndName: string = `datatype:${attr.spec.type.toLowerCase()}`;
                    const dataType: APIObject<DataTypeSpec> | undefined = etcd.kindNameIndex[kindAndName];
                    if (!dataType) {
                        throw new PreqlError(
                            "d8f0c648-fbb0-4d3e-8df2-e017f7d2a1ee",
                            `No such DataType '${attr.spec.type}'.`,
                        );
                    }
                    if (dataType.spec.jsonEquivalent !== "string") {
                        throw new PreqlError(
                            "a40a63ba-547e-4caa-98cb-2f6b2bfff20d",
                            `TextIndex '${obj.metadata.name}' cannot use Attribute `
                            + `'${attr.metadata.name}' because it DataType `
                            + `'${dataType.metadata.name}' is not fundamentally string-like, `
                            + "as determined by the DataType's `jsonEquivalent` property.",
                        );
                    }
                });
        }
    },
};

export default kind;
