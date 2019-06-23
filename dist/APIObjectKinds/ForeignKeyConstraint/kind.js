"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const matchingResource_1 = __importDefault(require("../matchingResource"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(schema_1.default);
const kind = {
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
            throw new PreqlError_1.default('b8fa5bfb-0033-45ec-b455-44ca82be6c46', `No Databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (!matchingResource_1.default(apiObject.spec.child.struct, 'struct', etcd)) {
            throw new PreqlError_1.default('797317ff-ac7e-421f-92ce-e476624c04cc', `No Structs found that are named '${apiObject.spec.child.struct}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (!matchingResource_1.default(apiObject.spec.parent.struct, 'struct', etcd)) {
            throw new PreqlError_1.default('9a15aca4-830c-4b30-bc6b-af76b5b663df', `No Structs found that are named '${apiObject.spec.parent.struct}' for ${apiObject.kind} `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (apiObject.spec.child.key.length !== apiObject.spec.parent.key.length) {
            throw new PreqlError_1.default('6891f351-74c1-44d8-96bc-9cf2f46529e6', `Number of key Attributes in child Struct '${apiObject.spec.child.struct}' `
                + 'does not match the number of key Attributes in the parent Struct '
                + `'${apiObject.spec.parent.struct}' for the ForeignKeyConstraint named `
                + `'${apiObject.metadata.name}'.`);
        }
        const attributes = etcd.kindIndex.attribute;
        if (!attributes || attributes.length === 0) {
            throw new PreqlError_1.default('7836bfb0-1bba-41ce-9304-3914199cbaab', `No Attributes found for ${apiObject.kind} '${apiObject.metadata.name}' `
                + 'to use as keys.');
        }
        const childStructAttributes = {};
        attributes
            .filter((attr) => (attr.spec.structName.toLowerCase() === apiObject.spec.child.struct.toLowerCase()
            && attr.spec.databaseName.toLowerCase() === apiObject.spec.databaseName.toLowerCase()))
            .forEach((attr) => {
            childStructAttributes[attr.spec.name.toLowerCase()] = attr;
        });
        const parentStructAttributes = {};
        attributes
            .filter((attr) => (attr.spec.structName.toLowerCase() === apiObject.spec.parent.struct.toLowerCase()
            && attr.spec.databaseName.toLowerCase() === apiObject.spec.databaseName.toLowerCase()))
            .forEach((attr) => {
            parentStructAttributes[attr.spec.name.toLowerCase()] = attr;
        });
        apiObject.spec.child.key.forEach((key) => {
            if (!(key.attributeName.toLowerCase() in childStructAttributes)) {
                throw new PreqlError_1.default('f6aedee2-f31c-424e-bdff-b4a22b3abd4b', `Child Struct '${apiObject.spec.child.struct}' has no Attribute named `
                    + `'${key.attributeName}' to which ForeignKeyConstraint `
                    + `'${apiObject.metadata.name}' can apply.`);
            }
        });
        apiObject.spec.parent.key.forEach((key) => {
            if (!(key.attributeName.toLowerCase() in parentStructAttributes)) {
                throw new PreqlError_1.default('8374f93a-b002-44e3-9a4c-50b5be1cfc82', `Parent Struct '${apiObject.spec.parent.struct}' has no Attribute named `
                    + `'${key.attributeName}' to which ForeignKeyConstraint `
                    + `'${apiObject.metadata.name}' can apply.`);
            }
        });
        // Note that nullability should not factor into the FKC.
        apiObject.spec.child.key.forEach((key, index) => {
            const childAttributeName = key.attributeName.toLowerCase();
            const childAttribute = childStructAttributes[childAttributeName];
            const parentAttributeName = apiObject.spec.parent.key[index].attributeName.toLowerCase();
            const parentAttribute = parentStructAttributes[parentAttributeName];
            if (!childAttribute)
                throw new Error('Assertion failed.');
            if (!parentAttribute)
                throw new Error('Assertion failed.');
            if (childAttribute.spec.type !== parentAttribute.spec.type
                || (
                // Remember, sometimes length is undefined legitimately.
                childAttribute.spec.length
                    && parentAttribute.spec.length
                    && childAttribute.spec.length !== parentAttribute.spec.length)) {
                throw new PreqlError_1.default('91263f5b-7d5b-47ca-b621-d609f9d63b36', 'Mismatching types between these attribute used in ForeignKeyConstraint '
                    + `'${apiObject.metadata.name}': '${key.attributeName}' and '${parentAttributeName}'.`);
            }
        });
    },
};
exports.default = kind;
