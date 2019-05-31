import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import schema from './schema';
import Spec from './spec';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'Postamble',
  getPath: (): string => '',
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: Promise.resolve,
  transpilePresenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>): string => `-- ${apiObject.spec.uncommentedText.replace(/\r?\n/, '\r\n-- ')}`,
    ],
  ]),
  transpileAbsenceIn: new Map([]),
};

export default kind;
