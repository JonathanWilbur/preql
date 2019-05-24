import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import schema from './schema';
import spec from './spec';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const namespaceValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'Namespace',
  // eslint-disable-next-line
  validateStructure: (apiObject: APIObject<any>): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject): void => {
      const valid: boolean = namespaceValidator(apiObject.spec) as boolean;
      if (valid) {
        resolve([]);
      } else {
        reject(new Error((namespaceValidator.errors || []).map(e => e.message).join('; ')));
      }
    });
  },
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
