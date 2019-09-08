import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import ajv from '../../ajv';
import PreqlError from '../../PreqlError';

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    // Validate CharacterSet
    if (apiObject.spec.characterSet && !etcd.pathIndex[apiObject.spec.characterSet.toLowerCase()]) {
      throw new PreqlError(
        '5f9536b1-4802-4324-aedc-6ad4a59d405d',
        `No CharacterSets found that are named '${apiObject.spec.characterSet}' for Server `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }

    // Validate Collation
    if (apiObject.spec.collation && !etcd.pathIndex[apiObject.spec.collation.toLowerCase()]) {
      throw new PreqlError(
        '7b8ab323-1e2b-4bf6-81c1-619b3a523b58',
        `No Collations found that are named '${apiObject.spec.collation}' for Server `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }
  },
};

export default kind;
