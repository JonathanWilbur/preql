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
    if (!(apiObject.spec.defaultCollation)) return;
    if (!etcd.pathIndex[apiObject.spec.defaultCollation.toLowerCase()]) {
      throw new PreqlError(
        '359299a4-d4f3-45c2-a4e0-e4d9064d3c76',
        `No Collations found that are named '${apiObject.spec.defaultCollation}' `
        + `to be the default collation for CharacterSet '${apiObject.metadata.name}'.`,
      );
    }
  },
};

export default kind;
