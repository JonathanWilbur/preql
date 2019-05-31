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
  name: 'TextIndex',
  getPath: (apiObject: APIObject<Spec>): string => {
    const databaseName: string = apiObject.spec.databaseName || '';
    const structName: string = apiObject.spec.structName || '';
    const indexName: string = apiObject.spec.name;
    return `${databaseName}.${structName}.${indexName}`;
  },
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: validateIndex,
  transpilePresenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>): string => {
        const schemaName: string = apiObject.spec.databaseName;
        const tableName: string = apiObject.spec.structName;
        const indexName: string = apiObject.spec.name;
        const storedProcedureName: string = `create_index_${indexName}`;
        const columnString: string = apiObject.spec.keyColumns
          .map((key): string => `${key.name} ${(key.ascending ? 'ASC' : 'DESC')}`)
          .join(', ');
        return (
          `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
          + 'DELIMITER $$\r\n'
          + `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n`
          + 'BEGIN\r\n'
          + '\tDECLARE EXIT HANDLER FOR 1061 DO 0;\r\n'
          + `\tALTER TABLE ${schemaName}.${tableName}\r\n`
          + `\tADD SPATIAL INDEX (${columnString});\r\n`
          + 'END $$\r\n'
          + 'DELIMITER ;\r\n'
          + `CALL ${storedProcedureName};\r\n`
          + `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
        );
      },
    ],
  ]),
  transpileAbsenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>) => 'ALTER TABLE '
        + `${apiObject.spec.databaseName}.${apiObject.spec.structName} DROP PRIMARY KEY;`,
    ],
  ]),
};

export default kind;
