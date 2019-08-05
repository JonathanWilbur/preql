import APIObject from '../Interfaces/APIObject';
import APIObjectKind from '../Interfaces/APIObjectKind';
import APIObjectSchema from '../JSONSchema/APIObject';
import kinds from '../APIObjectKinds';
import ajv from '../ajv';
import prohibitedIdentifiers from '../prohibitedIdentifiers';
import PreqlError from '../PreqlError';

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
  await structureValidator(apiObject);
  try {
    await kind.validateStructure(apiObject);
  } catch (e) {
    throw new PreqlError(
      '9bf4d422-e409-4f00-99f7-ac8cd4954175',
      `${apiObject.kind} '${apiObject.metadata.name}' failed structural `
      + `validation. ${e.message} ${e.errors || ''}`,
    );
  }
  if (prohibitedIdentifiers.indexOf(apiObject.metadata.name) !== -1) {
    throw new PreqlError(
      'ed7558d6-61b8-44e5-ae73-8feaf60404de',
      `Metadata name '${apiObject.metadata.name}' is prohibited.`,
    );
  }
  return Promise.resolve(true);
};
