import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import schema from './schema';
import spec from './spec';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'Namespace',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPath: (apiObject: APIObject<any>): string => apiObject.metadata.name,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateStructure: (apiObject: APIObject<any>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: (): Promise<void> => Promise.resolve(),
  transpilePresenceIn: new Map([
    [
      'mariadb',
      // TODO: Support character sets and collation.
      (apiObject: APIObject<spec>) => `CREATE DATABASE IF NOT EXISTS ${apiObject.metadata.name};`,
    ],
  ]),
  transpileAbsenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<spec>) => `DROP DATABASE IF EXISTS ${apiObject.metadata.name};`,
    ],
  ]),
};

export default kind;
