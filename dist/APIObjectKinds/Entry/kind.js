"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("../../ajv"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const schema_1 = __importDefault(require("./schema"));
const structureValidator = ajv_1.default.compile(schema_1.default);
/**
 * A simple object whose properties exactly match the `Attribute`s of a
 * `Struct`. It is said to be an "instance" of a "class." In a relational
 * database, this would be a row. In a document-oriented database, this
 * is a specific document--not a type of document or category of documents.
 */
const kind = {
    validateStructure: (obj) => structureValidator(obj.spec),
    validateSemantics: async (obj, etcd) => {
        const structAttributes = {};
        (etcd.kindIndex.attribute || [])
            .filter((attr) => (attr.spec.databaseName.toLowerCase() === obj.spec.databaseName.toLowerCase()
            && attr.spec.structName.toLowerCase() === obj.spec.structName.toLowerCase()))
            .forEach((attr) => {
            structAttributes[attr.spec.name.toLowerCase()] = attr;
        });
        (etcd.kindIndex.foreignkey || [])
            .filter((attr) => (attr.spec.databaseName.toLowerCase() === obj.spec.databaseName.toLowerCase()
            && attr.spec.childStructName.toLowerCase() === obj.spec.structName.toLowerCase()))
            .forEach((attr) => {
            structAttributes[attr.spec.name.toLowerCase()] = attr;
        });
        if (Object.keys(obj.spec.values).length === 0) {
            throw new PreqlError_1.default("60c92bba-e86a-4654-b767-a108b19a3425", `Entry ${obj.metadata.name} must have at least one attribute `
                + "in the `.spec.values` object.");
        }
        Object.entries(obj.spec.values)
            .map((kv) => {
            kv[0] = kv[0].toLowerCase();
            return kv;
        })
            .forEach((kv) => {
            const key = kv[0];
            const value = kv[1];
            // Check that an attribute with that name exists.
            const matchingAttribute = structAttributes[key];
            if (!matchingAttribute) {
                throw new PreqlError_1.default("a16cfa1b-e48b-4911-b918-92861a241d7b", `Attribute '${key}' does not exist on Struct '${obj.spec.structName}' `
                    + `for Entry '${obj.metadata.name}' to populate.`);
            }
            // Check that the attribute's data type is compatible with the Entry's attribute's type.
            const kindNameKey = "type" in matchingAttribute.spec
                ? `datatype:${matchingAttribute.spec.type.toLowerCase()}`
                : "";
            const datatype = etcd.kindNameIndex[kindNameKey];
            if (!datatype) {
                // This error should never occur.
                throw new PreqlError_1.default("8f5ddbcc-2740-4617-985a-fa2ce339bef8", "Unrecognized data type "
                    + `'${"type" in matchingAttribute.spec ? matchingAttribute.spec.type : ""}'.`);
            }
            const valueType = typeof value;
            const attributeJSONType = datatype.spec.jsonEquivalent.toLowerCase();
            if (attributeJSONType === "integer") {
                if (valueType !== "number") {
                    throw new Error(`Type used in Attribute '${key}' in Entry '${obj.metadata.name}' `
                        + "is not an integer, which is the legitimate type of that attribute.");
                }
                if (!(Number.isSafeInteger(value))) {
                    throw new PreqlError_1.default("2a22429e-8bd4-4f06-b01d-c114581fc922", `Number used in Attribute '${key}' in Entry '${obj.metadata.name}' `
                        + "is either too big or small to be safely used as an integer.");
                }
            }
            else if (valueType !== attributeJSONType) {
                throw new PreqlError_1.default("d8da9998-6f93-406b-a900-a52e51ad7431", `Type '${valueType}' used in Attribute '${key}' in Entry `
                    + `'${obj.metadata.name}' is not compatible with the `
                    + `legitimate type of that Attribute, which is a(n) '${datatype.metadata.name}'.`);
            }
            // Check regexes
            if (valueType === "string" && datatype.spec.regexes && datatype.spec.regexes.pcre) {
                const match = Object.entries(datatype.spec.regexes.pcre)
                    .some((group) => {
                    if (!datatype.spec.regexes)
                        return false;
                    return Object.entries(datatype.spec.regexes.pcre[group[0]])
                        .every((re) => {
                        const regex = new RegExp(re[1].pattern, "u");
                        if (re[1].positive) { // Make sure it matches.
                            return regex.test(value);
                        }
                        // Or, make sure it doesn't match.
                        return !regex.test(value);
                    });
                });
                if (!match) {
                    throw new PreqlError_1.default("db04d1b5-88a5-47fe-8b37-2b11d26a149c", `None of the regular expressions for data type '${datatype.metadata.name}' `
                        + `matched the value of '${key}' for Entry '${obj.metadata.name}'.`);
                }
            }
            // Check minimums and maximums
            if (valueType === "number") {
                if (datatype.spec.minimum && value < datatype.spec.minimum) {
                    throw new PreqlError_1.default("b9d92500-6ac6-4a4f-80d6-dc63de8a1643", `Value of '${key}' for Entry '${obj.metadata.name}' was `
                        + `${value}, but the permissible minimum for `
                        + `the data type '${datatype.metadata.name}' is ${datatype.spec.minimum}.`);
                }
                if (datatype.spec.maximum && value > datatype.spec.maximum) {
                    throw new PreqlError_1.default("15327242-05eb-4cd0-ab78-47f2525bc5b8", `Value of '${key}' for Entry '${obj.metadata.name}' was `
                        + `${value}, but the permissible maximum for `
                        + `the data type '${datatype.metadata.name}' is ${datatype.spec.maximum}.`);
                }
            }
        });
        const usedAttributes = new Set(Object.keys(obj.spec.values).map((k) => k.toLowerCase()));
        Object.values(structAttributes)
            .forEach((attr) => {
            // The JSON Schema default directive does not work here.
            // I suspect it is because of this: https://www.npmjs.com/package/ajv#assigning-defaults.
            if (typeof attr.spec.nullable === "boolean"
                && attr.spec.nullable === false
                && !(usedAttributes.has(attr.spec.name.toLowerCase()))) {
                const structName = "structName" in attr.spec
                    ? attr.spec.structName
                    : attr.spec.childStructName;
                throw new PreqlError_1.default("390b1998-90a7-487d-9145-2a2b5e2c123f", `Attribute '${attr.spec.name}' in Struct '${attr.spec.databaseName}'.`
                    + `'${structName}' cannot be null for entry '${obj.metadata.name}'.`);
            }
        });
    },
};
exports.default = kind;
//# sourceMappingURL=kind.js.map