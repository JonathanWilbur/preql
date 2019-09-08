import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import ajv from '../../ajv';
import PreqlError from '../../PreqlError';

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (obj: APIObject<Spec>): Promise<void> => structureValidator(obj.spec) as Promise<void>,
  validateSemantics: async (obj: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    // Validate CharacterSet
    if (obj.spec.characterSet && !etcd.pathIndex[obj.spec.characterSet.toLowerCase()]) {
      throw new PreqlError(
        '5f9536b1-4802-4324-aedc-6ad4a59d405d',
        `No CharacterSets found that are named '${obj.spec.characterSet}' for Server `
        + `'${obj.metadata.name}' to use.`,
      );
    }

    // Validate Collation
    if (obj.spec.collation && !etcd.pathIndex[obj.spec.collation.toLowerCase()]) {
      throw new PreqlError(
        '7b8ab323-1e2b-4bf6-81c1-619b3a523b58',
        `No Collations found that are named '${obj.spec.collation}' for Server `
        + `'${obj.metadata.name}' to use.`,
      );
    }
  },
};

export default kind;
