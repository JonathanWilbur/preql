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
        'e4d5bf3b-1063-42dd-8ce6-15e6f98fbb5f',
        `No CharacterSets found that are named '${apiObject.spec.characterSet}' for Database `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }

    // Validate Collation
    if (apiObject.spec.collation && !etcd.pathIndex[apiObject.spec.collation.toLowerCase()]) {
      throw new PreqlError(
        'a3cc2f42-099f-43ee-be57-c8d2aa842712',
        `No Collations found that are named '${apiObject.spec.collation}' for Database `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }
  },
};

export default kind;
