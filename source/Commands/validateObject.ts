import APIObject from '../Interfaces/APIObject';
import APIObjectKind from '../Interfaces/APIObjectKind';
import APIObjectSchema from '../JSONSchema/APIObject';
import kinds from '../APIObjectKinds';

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
const structureValidator = ajv.compile(APIObjectSchema);

/**
 * Resolves a boolean indicating whether the `spec` field has been validated.
 * A resolution of `false` means that just the header was validated, but it was
 * valid. Rejects if any part of the object is invalid.
 *
 * @param apiObject The object to be structurally validated.
 */
export default
async function validateStructure(apiObject: APIObject): Promise<boolean> {
  const kind : APIObjectKind | undefined = kinds[apiObject.kind.toLowerCase()];
  if (!kind) return Promise.resolve(false);
  // await Promise.all([
  // const valid =
  await structureValidator(apiObject);
  // if (!valid) throw new Error('wwuuuwuut');
  await kind.validateStructure(apiObject);
  // ]);
  return Promise.resolve(true);
};
