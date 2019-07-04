import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import matchingResource from '../matchingResource';
import PreqlError from '../../PreqlError';
import ajv from '../../ajv';

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new PreqlError(
        '58f2e994-a54a-48e2-8d53-d7015f934beb',
        `No Databases found that are named '${apiObject.spec.databaseName}' for Attribute `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (apiObject.spec.entityName && !matchingResource(apiObject.spec.entityName, 'entity', etcd)) {
      throw new PreqlError(
        'd5b8e0a0-5e69-44bc-8c93-d238c4b3f133',
        `No Entities found that are named '${apiObject.spec.entityName}' for Attribute `
        + `'${apiObject.metadata.name}' to be associated with.`,
      );
    }
    if (!matchingResource(apiObject.spec.structName, 'struct', etcd)) {
      throw new PreqlError(
        '1d985193-ce84-4051-a0cc-af9984094d4f',
        `No Structs found that are named '${apiObject.spec.structName}' for Attribute `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (apiObject.spec.characterSet && !matchingResource(apiObject.spec.characterSet, 'characterset', etcd)) {
      throw new PreqlError(
        '9f1e04b9-60bf-4832-ba09-72537231fe1f',
        `No CharacterSets found that are named '${apiObject.spec.characterSet}' for Attribute `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }
    if (apiObject.spec.collation && !matchingResource(apiObject.spec.collation, 'collation', etcd)) {
      throw new PreqlError(
        '53298ed2-c4cf-41c7-b8fb-bf386388f1b8',
        `No Collations found that are named '${apiObject.spec.collation}' for Attribute `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }
  },
};

export default kind;
