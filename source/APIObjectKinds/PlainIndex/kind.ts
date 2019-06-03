import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import schema from './schema';
import Spec from './spec';
import validateIndex from '../validateIndex';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'PlainIndex',
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: validateIndex,
  transpilePresenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>): string => {
        const columnString: string = apiObject.spec.keyColumns
          .map((key): string => `${key.name} ${(key.ascending ? 'ASC' : 'DESC')}`)
          .join(', ');
        return (
          `ALTER TABLE ${apiObject.spec.databaseName}.${apiObject.spec.structName}\r\n`
          + `ADD INDEX IF NOT EXISTS ${apiObject.spec.name}\r\n`
          + `PRIMARY KEY (${columnString});`
        );
      },
    ],
  ]),
  transpileAbsenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>) => 'ALTER TABLE '
        + `${apiObject.spec.databaseName}.${apiObject.spec.structName}\r\n`
        + `DROP INDEX IF EXISTS ${apiObject.spec.name};`,
    ],
  ]),
};

export default kind;
