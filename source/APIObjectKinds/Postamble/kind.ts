import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import schema from './schema';
import Spec from './spec';
import ajv from '../../ajv';

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: () => Promise.resolve(),
};

export default kind;
