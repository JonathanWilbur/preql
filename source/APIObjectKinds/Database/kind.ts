import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import schema from './schema';
import Spec from './spec';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});
ajv.addKeyword('unicodePattern', {
  // eslint-disable-next-line
  validate: (schema: any, data: any): boolean => (
    typeof schema === 'string' && typeof data === 'string'
      ? (new RegExp(schema, 'u')).test(data) : false
  ),
  async: true,
  errors: false,
});
const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: (): Promise<void> => Promise.resolve(),
};

export default kind;
