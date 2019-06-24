import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import schema from './schema';
import Spec from './spec';
import PreqlError from '../../PreqlError';
import ajv from '../../ajv';

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>): Promise<void> => {
    if (apiObject.spec.regexes && apiObject.spec.jsonEquivalent.toLowerCase() !== 'string') {
      throw new PreqlError(
        '2abf0f1e-601e-4051-9b66-b6280564093f',
        `Regexes may not be used in data type '${apiObject.metadata.name}', `
        + 'because it is not fundamentally string-like.',
      );
    }

    if (apiObject.spec.setters && apiObject.spec.jsonEquivalent.toLowerCase() !== 'string') {
      throw new PreqlError(
        '68dc3bb0-b3ae-46ff-b003-17e1cac35e1f',
        `Setters may not be used in data type '${apiObject.metadata.name}', `
        + 'because it is not fundamentally string-like.',
      );
    }

    // Validate regexes
    if (apiObject.spec.regexes && apiObject.spec.regexes.pcre) {
      Object.entries(apiObject.spec.regexes.pcre)
        .forEach((group): void => {
          group[1].forEach((re, index): void => {
            try {
              // eslint-disable-next-line
              new RegExp(re.pattern);
            } catch (e) {
              throw new PreqlError(
                '9f65eaff-b915-4889-9d6c-8e3a757b5b4e',
                `Invalid regular expression for data type '${apiObject.metadata.name}'. `
                + `Group '${group[0]}', index: ${index}.`,
              );
            }
          });
        });
    }

    // Ensure every target has either return or returnBasedOnLength
    Object.entries(apiObject.spec.targets)
      .forEach((target): void => {
        if (!(target[1].return) && !(target[1].returnBasedOnLength)) {
          throw new PreqlError(
            'faa52d5c-f397-4e2c-9d9b-bb05cf4428a8',
            `Data type '${apiObject.metadata.name}' must have either `
            + "a 'return' or 'returnBasedOnLength' field.",
          );
        }
      });
  },
};

export default kind;
