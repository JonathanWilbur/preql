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
  name: 'Database',
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: (): Promise<void> => Promise.resolve(),
  transpilePresenceIn: new Map([
    [
      'mariadb',
      // TODO: Support character sets and collation.
      (apiObject: APIObject<Spec>) => `CREATE DATABASE IF NOT EXISTS ${apiObject.spec.name};`,
    ],
  ]),
  transpileAbsenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>) => `DROP DATABASE IF EXISTS ${apiObject.spec.name};`,
    ],
  ]),
};

export default kind;
