"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const matchingResource_1 = __importDefault(require("../matchingResource"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const ajv_1 = __importDefault(require("../../ajv"));
const prohibitedIdentifiers_1 = __importDefault(require("../../prohibitedIdentifiers"));
const structureValidator = ajv_1.default.compile(schema_1.default);
const kind = {
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        if (prohibitedIdentifiers_1.default.indexOf(apiObject.spec.name) !== -1) {
            throw new PreqlError_1.default('74935c2f-ff54-42dc-923d-c66f1c9adcb2', `Attribute name '${apiObject.spec.name}' is prohibited.`);
        }
        if (!matchingResource_1.default(apiObject.spec.databaseName, 'database', etcd)) {
            throw new PreqlError_1.default('58f2e994-a54a-48e2-8d53-d7015f934beb', `No Databases found that are named '${apiObject.spec.databaseName}' for Attribute `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (apiObject.spec.entityName && !matchingResource_1.default(apiObject.spec.entityName, 'entity', etcd)) {
            throw new PreqlError_1.default('d5b8e0a0-5e69-44bc-8c93-d238c4b3f133', `No Entities found that are named '${apiObject.spec.entityName}' for Attribute `
                + `'${apiObject.metadata.name}' to be associated with.`);
        }
        if (!matchingResource_1.default(apiObject.spec.structName, 'struct', etcd)) {
            throw new PreqlError_1.default('1d985193-ce84-4051-a0cc-af9984094d4f', `No Structs found that are named '${apiObject.spec.structName}' for Attribute `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        if (apiObject.spec.characterSet && !matchingResource_1.default(apiObject.spec.characterSet, 'characterset', etcd)) {
            throw new PreqlError_1.default('9f1e04b9-60bf-4832-ba09-72537231fe1f', `No CharacterSets found that are named '${apiObject.spec.characterSet}' for Attribute `
                + `'${apiObject.metadata.name}' to use.`);
        }
        if (apiObject.spec.collation && !matchingResource_1.default(apiObject.spec.collation, 'collation', etcd)) {
            throw new PreqlError_1.default('53298ed2-c4cf-41c7-b8fb-bf386388f1b8', `No Collations found that are named '${apiObject.spec.collation}' for Attribute `
                + `'${apiObject.metadata.name}' to use.`);
        }
        const datatype = (etcd.kindIndex.datatype || [])
            .find((obj) => obj.metadata.name === apiObject.spec.type);
        if (!datatype) {
            throw new PreqlError_1.default('6d125c9f-957a-4ce0-9e2a-074ee31fa5f1', `No DataTypes found that are named '${apiObject.spec.type}' for Attribute `
                + `'${apiObject.metadata.name}' to use.`);
        }
        if ((apiObject.spec.characterSet || apiObject.spec.collation)
            && datatype.spec.jsonEquivalent.toLowerCase() !== 'string') {
            throw new PreqlError_1.default('c939691d-523f-476d-a751-b878a6613a75', 'Character sets and collations may not apply to Attribute '
                + `'${apiObject.metadata.name}', because it is not fundamentally a `
                + 'string type.');
        }
    },
};
exports.default = kind;
