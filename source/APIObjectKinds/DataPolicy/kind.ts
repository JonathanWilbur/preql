import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import schema from './schema';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'DataPolicy',
  validateStructure: (apiObject: APIObject): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (): Promise<void> => {},
};

export default kind;
