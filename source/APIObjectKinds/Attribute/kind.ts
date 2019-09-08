import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import PreqlError from '../../PreqlError';
import ajv from '../../ajv';
import DataTypeSpec from '../DataType/spec';
import prohibitedIdentifiers from '../../prohibitedIdentifiers';

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (prohibitedIdentifiers.indexOf(apiObject.spec.name) !== -1) {
      throw new PreqlError(
        '74935c2f-ff54-42dc-923d-c66f1c9adcb2',
        `Attribute name '${apiObject.spec.name}' is prohibited.`,
      );
    }

    const databasePath: string = apiObject.spec.databaseName.toLowerCase();
    const entityPath: string = `${apiObject.spec.databaseName}.$${apiObject.spec.entityName}`.toLowerCase();
    const structPath: string = [apiObject.spec.databaseName, apiObject.spec.structName].join('.').toLowerCase();
    const characterSetPath: string = (apiObject.spec.characterSet || '').toLowerCase();
    const collationPath: string = (apiObject.spec.collation || '').toLowerCase();

    if (!(etcd.pathIndex[databasePath])) {
      throw new PreqlError(
        '58f2e994-a54a-48e2-8d53-d7015f934beb',
        `No Databases found that are named '${apiObject.spec.databaseName}' for Attribute `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (apiObject.spec.entityName && !etcd.pathIndex[entityPath]) {
      throw new PreqlError(
        'd5b8e0a0-5e69-44bc-8c93-d238c4b3f133',
        `No Entities found that are named '${apiObject.spec.entityName}' for Attribute `
        + `'${apiObject.metadata.name}' to be associated with.`,
      );
    }
    if (!etcd.pathIndex[structPath]) {
      throw new PreqlError(
        '1d985193-ce84-4051-a0cc-af9984094d4f',
        `No Structs found that are named '${apiObject.spec.structName}' for Attribute `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (apiObject.spec.characterSet && !etcd.kindIndex[characterSetPath]) {
      throw new PreqlError(
        '9f1e04b9-60bf-4832-ba09-72537231fe1f',
        `No CharacterSets found that are named '${apiObject.spec.characterSet}' for Attribute `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }
    if (apiObject.spec.collation && !etcd.kindIndex[collationPath]) {
      throw new PreqlError(
        '53298ed2-c4cf-41c7-b8fb-bf386388f1b8',
        `No Collations found that are named '${apiObject.spec.collation}' for Attribute `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }

    const datatype: APIObject<DataTypeSpec> | undefined = etcd
      .kindNameIndex[`datatype:${apiObject.spec.type.toLowerCase()}`];
    if (!datatype) {
      throw new PreqlError(
        '6d125c9f-957a-4ce0-9e2a-074ee31fa5f1',
        `No DataTypes found that are named '${apiObject.spec.type}' for Attribute `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }
    if (
      (apiObject.spec.characterSet || apiObject.spec.collation)
      && datatype.spec.jsonEquivalent.toLowerCase() !== 'string'
    ) {
      throw new PreqlError(
        'c939691d-523f-476d-a751-b878a6613a75',
        'Character sets and collations may not apply to Attribute '
        + `'${apiObject.metadata.name}', because it is not fundamentally a `
        + 'string type.',
      );
    }
  },
};

export default kind;
