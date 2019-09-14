import ajv from "../../ajv";
import APIObject from "../../Interfaces/APIObject";
import APIObjectDatabase from "../../Interfaces/APIObjectDatabase";
import APIObjectKind from "../../Interfaces/APIObjectKind";
import PreqlError from "../../PreqlError";
import AttributeSpec from "../Attribute/spec";
import DataTypeSpec from "../DataType/spec";
import ForeignKeySpec from "../ForeignKey/spec";
import schema from "./schema";
import Spec from "./spec";

const structureValidator = ajv.compile(schema);

/**
 * A simple object whose properties exactly match the `Attribute`s of a
 * `Struct`. It is said to be an "instance" of a "class." In a relational
 * database, this would be a row. In a document-oriented database, this
 * is a specific document--not a type of document or category of documents.
 */
const kind: APIObjectKind = {
    validateStructure: (obj: APIObject<Spec>): Promise<void> => structureValidator(obj.spec) as Promise<void>,
    validateSemantics: async (obj: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
        const structAttributes: Record<string, APIObject<AttributeSpec | ForeignKeySpec>> = {};
        (etcd.kindIndex.attribute || [])
            .filter((attr: APIObject<AttributeSpec>): boolean => (
                attr.spec.databaseName.toLowerCase() === obj.spec.databaseName.toLowerCase()
                && attr.spec.structName.toLowerCase() === obj.spec.structName.toLowerCase()
            ))
            .forEach((attr: APIObject<AttributeSpec>): void => {
                structAttributes[attr.spec.name.toLowerCase()] = attr;
            });

        (etcd.kindIndex.foreignkey || [])
            .filter((attr: APIObject<ForeignKeySpec>): boolean => (
                attr.spec.databaseName.toLowerCase() === obj.spec.databaseName.toLowerCase()
                && attr.spec.childStructName.toLowerCase() === obj.spec.structName.toLowerCase()
            ))
            .forEach((attr: APIObject<ForeignKeySpec>): void => {
                structAttributes[attr.spec.name.toLowerCase()] = attr;
            });

        if (Object.keys(obj.spec.values).length === 0) {
            throw new PreqlError(
                "60c92bba-e86a-4654-b767-a108b19a3425",
                `Entry ${obj.metadata.name} must have at least one attribute `
                + "in the `.spec.values` object.",
            );
        }

        Object.keys(obj.spec.values)
            .map((key: string): string => key.toLowerCase())
            .forEach((key: string): void => {
                // Check that an attribute with that name exists.
                const matchingAttribute: APIObject<AttributeSpec | ForeignKeySpec> = structAttributes[key];
                if (!matchingAttribute) {
                    throw new PreqlError(
                        "a16cfa1b-e48b-4911-b918-92861a241d7b",
                        `Attribute '${key}' does not exist on Struct '${obj.spec.structName}' `
                        + `for Entry '${obj.metadata.name}' to populate.`,
                    );
                }

                // Check that the attribute's data type is compatible with the Entry's attribute's type.
                const kindNameKey: string = "type" in matchingAttribute.spec
                    ? `datatype:${matchingAttribute.spec.type.toLowerCase()}`
                    : "";
                const datatype: APIObject<DataTypeSpec> | undefined = etcd.kindNameIndex[kindNameKey];
                if (!datatype) {
                    // This error should never occur.
                    throw new PreqlError(
                        "8f5ddbcc-2740-4617-985a-fa2ce339bef8",
                        "Unrecognized data type "
                        + `'${"type" in matchingAttribute.spec ? matchingAttribute.spec.type : ""}'.`,
                    );
                }
                const valueType: string = typeof obj.spec.values[key];
                const attributeJSONType: string = datatype.spec.jsonEquivalent.toLowerCase();
                if (attributeJSONType === "integer") {
                    if (valueType !== "number") {
                        throw new Error(
                            `Type used in Attribute '${key}' in Entry '${obj.metadata.name}' `
                            + "is not an integer, which is the legitimate type of that attribute.",
                        );
                    }
                    if (!(Number.isSafeInteger(obj.spec.values[key] as number))) {
                        throw new PreqlError(
                            "2a22429e-8bd4-4f06-b01d-c114581fc922",
                            `Number used in Attribute '${key}' in Entry '${obj.metadata.name}' `
                            + "is either too big or small to be safely used as an integer.",
                        );
                    }
                } else if (valueType !== attributeJSONType) {
                    throw new PreqlError(
                        "d8da9998-6f93-406b-a900-a52e51ad7431",
                        `Type '${valueType}' used in Attribute '${key}' in Entry `
                        + `'${obj.metadata.name}' is not compatible with the `
                        + `legitimate type of that Attribute, which is a(n) '${datatype.metadata.name}'.`,
                    );
                }

                // Check regexes
                if (valueType === "string" && datatype.spec.regexes && datatype.spec.regexes.pcre) {
                    const match: boolean = Object.entries(datatype.spec.regexes.pcre)
                        .some((group): boolean => {
                            if (!datatype.spec.regexes) return false;
                            return Object.entries(datatype.spec.regexes.pcre[group[0]])
                                .every((re): boolean => {
                                    const regex: RegExp = new RegExp(re[1].pattern, "u");
                                    if (re[1].positive) { // Make sure it matches.
                                        return regex.test(obj.spec.values[key] as string);
                                    }
                                    // Or, make sure it doesn't match.
                                    return !regex.test(obj.spec.values[key] as string);
                                });
                        });
                    if (!match) {
                        throw new PreqlError(
                            "db04d1b5-88a5-47fe-8b37-2b11d26a149c",
                            `None of the regular expressions for data type '${datatype.metadata.name}' `
                            + `matched the value of '${key}' for Entry '${obj.metadata.name}'.`,
                        );
                    }
                }

                // Check minimums and maximums
                if (valueType === "number") {
                    if (datatype.spec.minimum && obj.spec.values[key] < datatype.spec.minimum) {
                        throw new PreqlError(
                            "b9d92500-6ac6-4a4f-80d6-dc63de8a1643",
                            `Value of '${key}' for Entry '${obj.metadata.name}' was `
                            + `${obj.spec.values[key]}, but the permissible minimum for `
                            + `the data type '${datatype.metadata.name}' is ${datatype.spec.minimum}.`,
                        );
                    }
                    if (datatype.spec.maximum && obj.spec.values[key] > datatype.spec.maximum) {
                        throw new PreqlError(
                            "15327242-05eb-4cd0-ab78-47f2525bc5b8",
                            `Value of '${key}' for Entry '${obj.metadata.name}' was `
                            + `${obj.spec.values[key]}, but the permissible maximum for `
                            + `the data type '${datatype.metadata.name}' is ${datatype.spec.maximum}.`,
                        );
                    }
                }
            });

        const usedAttributes = Object.keys(obj.spec.values).map((k: string): string => k.toLowerCase());
        Object.values(structAttributes)
            .forEach((attr: APIObject<AttributeSpec | ForeignKeySpec>): void => {
                // The JSON Schema default directive does not work here.
                // I suspect it is because of this: https://www.npmjs.com/package/ajv#assigning-defaults.
                if (
                    typeof attr.spec.nullable === "boolean"
                    && attr.spec.nullable === false
                    && !(attr.spec.name.toLowerCase() in usedAttributes)
                ) {
                    const structName = "structName" in attr.spec
                        ? attr.spec.structName
                        : attr.spec.childStructName;
                    throw new PreqlError(
                        "390b1998-90a7-487d-9145-2a2b5e2c123f",
                        `Attribute '${attr.spec.name}' in Struct '${attr.spec.databaseName}'.`
                        + `'${structName}' cannot be null for entry '${obj.metadata.name}'.`,
                    );
                }
            });
    },
};

export default kind;
