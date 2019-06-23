import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import matchingResource from '../matchingResource';
import PreqlError from '../../PreqlError';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

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
  },
};

export default kind;
