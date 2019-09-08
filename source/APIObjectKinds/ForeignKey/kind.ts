import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import schema from './schema';
import Spec from './spec';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import PreqlError from '../../PreqlError';
import ajv from '../../ajv';
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
    const childStructPath: string = `${apiObject.spec.databaseName}.${apiObject.spec.childStructName}`.toLowerCase();
    const parentStructPath: string = `${apiObject.spec.databaseName}.${apiObject.spec.parentStructName}`.toLowerCase();

    if (!etcd.pathIndex[databasePath]) {
      throw new PreqlError(
        'b8fa5bfb-0033-45ec-b455-44ca82be6c46',
        `No Databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!etcd.pathIndex[childStructPath]) {
      throw new PreqlError(
        '797317ff-ac7e-421f-92ce-e476624c04cc',
        `No Structs found that are named '${apiObject.spec.childStructName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!etcd.pathIndex[parentStructPath]) {
      throw new PreqlError(
        '9a15aca4-830c-4b30-bc6b-af76b5b663df',
        `No Structs found that are named '${apiObject.spec.parentStructName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
  },
};

export default kind;
