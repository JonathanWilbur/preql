import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
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
  name: 'Entity',
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new Error(
        `No databases found that are named '${apiObject.spec.databaseName}' for Entity `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!matchingResource(apiObject.spec.rootStruct, 'struct', etcd)) {
      throw new Error(
        `No structs found that are named '${apiObject.spec.rootStruct}' for Entity `
        + `'${apiObject.metadata.name}' to use as the root struct.`,
      );
    }
  },
  transpilePresenceIn: new Map([
    [
      'mariadb',
      () => '',
    ],
  ]),
  transpileAbsenceIn: new Map([
    [
      'mariadb',
      () => '',
    ],
  ]),
};

export default kind;
