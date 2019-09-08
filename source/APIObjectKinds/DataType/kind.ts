import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import schema from './schema';
import Spec from './spec';
import PreqlError from '../../PreqlError';
import ajv from '../../ajv';

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (obj: APIObject<Spec>): Promise<void> => structureValidator(obj.spec) as Promise<void>,
  validateSemantics: async (obj: APIObject<Spec>): Promise<void> => {
    // Validate regexes
    if (obj.spec.regexes && obj.spec.regexes.pcre) {
      Object.entries(obj.spec.regexes.pcre)
        .forEach((group): void => {
          group[1].forEach((re, index): void => {
            try {
              // eslint-disable-next-line
              new RegExp(re.pattern);
            } catch (e) {
              throw new PreqlError(
                '9f65eaff-b915-4889-9d6c-8e3a757b5b4e',
                `Invalid regular expression for data type '${obj.metadata.name}'. `
                + `Group '${group[0]}', index: ${index}.`,
              );
            }
          });
        });
    };
  },
};

export default kind;
