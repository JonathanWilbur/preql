import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import PreqlError from '../../PreqlError';
import ajv from '../../ajv';

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (!etcd.pathIndex[apiObject.spec.databaseName.toLowerCase()]) {
      throw new PreqlError(
        'eacff4b7-03b2-4495-8153-6f75ddff8854',
        `No Databases found that are named '${apiObject.spec.databaseName}' for Entity `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!etcd.pathIndex[`${apiObject.spec.databaseName}.${apiObject.spec.rootStruct}`.toLowerCase()]) {
      throw new PreqlError(
        '3498526b-f3f4-4c6a-9484-7972d1cc4c29',
        `No Structs found that are named '${apiObject.spec.rootStruct}' for Entity `
        + `'${apiObject.metadata.name}' to use as the root Struct.`,
      );
    }
  },
};

export default kind;
