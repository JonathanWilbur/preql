import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import matchingResource from '../matchingResource';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'Attribute',
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new Error(
        `No databases found that are named '${apiObject.spec.databaseName}' for attribute `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!matchingResource(apiObject.spec.structName, 'struct', etcd)) {
      throw new Error(
        `No structs found that are named '${apiObject.spec.structName}' for attribute `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
  },
};

export default kind;
