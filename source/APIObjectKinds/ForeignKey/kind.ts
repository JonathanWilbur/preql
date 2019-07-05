import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import schema from './schema';
import Spec from './spec';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import matchingResource from '../matchingResource';
import PreqlError from '../../PreqlError';
import ajv from '../../ajv';

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new PreqlError(
        'b8fa5bfb-0033-45ec-b455-44ca82be6c46',
        `No Databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!matchingResource(apiObject.spec.childStruct, 'struct', etcd)) {
      throw new PreqlError(
        '797317ff-ac7e-421f-92ce-e476624c04cc',
        `No Structs found that are named '${apiObject.spec.childStruct}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!matchingResource(apiObject.spec.parentStruct, 'struct', etcd)) {
      throw new PreqlError(
        '9a15aca4-830c-4b30-bc6b-af76b5b663df',
        `No Structs found that are named '${apiObject.spec.parentStruct}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
  },
};

export default kind;
