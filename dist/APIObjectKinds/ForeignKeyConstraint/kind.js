"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const matchingResource_1 = __importDefault(require("../matchingResource"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(schema_1.default);
const kind = {
    name: 'ForeignKeyConstraint',
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
            throw new Error(`No databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (!matchingResource_1.default(apiObject.spec.child.struct, 'struct', etcd)) {
            throw new Error(`No structs found that are named '${apiObject.spec.child.struct}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (!matchingResource_1.default(apiObject.spec.parent.struct, 'struct', etcd)) {
            throw new Error(`No structs found that are named '${apiObject.spec.parent.struct}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (apiObject.spec.child.key.length !== apiObject.spec.parent.key.length) {
            throw new Error(`Number of key attributes in child struct '${apiObject.spec.child.struct}' `
                + 'does not match the number of key attributes in the parent struct '
                + `'${apiObject.spec.parent.struct}' for the ForeignKeyConstraint named `
                + `'${apiObject.metadata.name}'.`);
        }
        const columns = etcd.kindIndex.attribute;
        if (!columns || columns.length === 0) {
            throw new Error(`No attributes found for ${apiObject.kind} '${apiObject.metadata.name}' `
                + 'to use as keys.');
        }
        const childStructAttributes = {};
        columns
            .filter((attr) => (attr.spec.structName.toLowerCase() === apiObject.spec.child.struct.toLowerCase()
            && attr.spec.databaseName.toLowerCase() === apiObject.spec.databaseName.toLowerCase()))
            .forEach((attr) => {
            childStructAttributes[attr.spec.name.toLowerCase()] = attr;
        });
        const parentStructAttributes = {};
        columns
            .filter((attr) => (attr.spec.structName.toLowerCase() === apiObject.spec.parent.struct.toLowerCase()
            && attr.spec.databaseName.toLowerCase() === apiObject.spec.databaseName.toLowerCase()))
            .forEach((attr) => {
            parentStructAttributes[attr.spec.name.toLowerCase()] = attr;
        });
        apiObject.spec.child.key.forEach((key) => {
            if (!(key.columnName.toLowerCase() in childStructAttributes)) {
                throw new Error(`Child struct '${apiObject.spec.child.struct}' has no column named `
                    + `'${key.columnName}' to which ForeignKeyConstraint `
                    + `'${apiObject.metadata.name}' can apply.`);
            }
        });
        apiObject.spec.parent.key.forEach((key) => {
            if (!(key.columnName.toLowerCase() in parentStructAttributes)) {
                throw new Error(`Parent struct '${apiObject.spec.parent.struct}' has no column named `
                    + `'${key.columnName}' to which ForeignKeyConstraint `
                    + `'${apiObject.metadata.name}' can apply.`);
            }
        });
        // Note that nullability should not factor into the FKC.
        apiObject.spec.child.key.forEach((key, index) => {
            const childAttributeName = key.columnName.toLowerCase();
            const childAttribute = childStructAttributes[childAttributeName];
            const parentAttributeName = apiObject.spec.parent.key[index].columnName.toLowerCase();
            const parentAttribute = parentStructAttributes[parentAttributeName];
            if (!childAttribute)
                throw new Error('Assertion failed.');
            if (!parentAttribute)
                throw new Error('Assertion failed');
            if (childAttribute.spec.type !== parentAttribute.spec.type
                || (
                // Remember, sometimes length is undefined legitimately.
                childAttribute.spec.length
                    && parentAttribute.spec.length
                    && childAttribute.spec.length !== parentAttribute.spec.length)) {
                throw new Error('Mismatching types between these columns used in ForeignKeyConstraint '
                    + `'${apiObject.metadata.name}': '${key.columnName}' and '${parentAttributeName}'.`);
            }
        });
    },
};
exports.default = kind;
