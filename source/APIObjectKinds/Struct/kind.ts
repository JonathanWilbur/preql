import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import AttributeSpec from '../Attribute/spec';
import AttributeKind from '../Attribute/kind';
import DatabaseSpec from '../Database/spec';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'Struct',
  getPath: (apiObject: APIObject<Spec>): string => {
    const databaseName: string = apiObject.spec.databaseName || '';
    const structName: string = apiObject.spec.name || '';
    return `${databaseName}.${structName}`;
  },
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    const databases: APIObject<DatabaseSpec>[] | undefined = etcd.kindIndex.get('database');
    if (!databases) {
      throw new Error(`No databases defined for Struct '${apiObject.metadata.name}' to attach to.`);
    }
    const matchingDatabaseFound: boolean = databases
      .some((database: APIObject<DatabaseSpec>): boolean => database.spec.name === apiObject.spec.databaseName);
    if (!matchingDatabaseFound) {
      throw new Error(
        `No databases found that are named '${apiObject.spec.databaseName}' for Entity `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
  },
  transpilePresenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): string => {
        const columnTranspiler = AttributeKind.transpilePresenceIn.get('mariadb');
        if (!columnTranspiler) {
          throw new Error('Cannot transpile columns for MariaDB.');
        }
        let transpiledAttributes: string[] = [];
        const attributes: APIObject<AttributeSpec>[] | undefined = etcd.kindIndex.get('attribute');
        if (attributes) {
          transpiledAttributes = attributes
            .filter((attr: APIObject<AttributeSpec>): boolean => {
              if (
                attr.spec.databaseName === apiObject.spec.databaseName
                && attr.spec.structName === apiObject.spec.name
              ) return true;
              return false;
            }).map((column: APIObject<AttributeSpec>): string => columnTranspiler(column, etcd));
        } else {
          throw new Error('Cannot define a Struct with no attributes defined.');
        }
        if (transpiledAttributes.length === 0) {
          throw new Error(`No attributes (columns) found for struct (table) '${apiObject.metadata.name}'.`);
        }
        return 'CREATE TABLE IF NOT EXISTS '
          + `${apiObject.spec.databaseName}.${apiObject.spec.name} (__placeholder__ BOOLEAN);\r\n\r\n`
          + `${transpiledAttributes.join('\r\n\r\n')}\r\n\r\n`
          + `ALTER TABLE ${apiObject.spec.databaseName}.${apiObject.spec.name} `
          + 'DROP COLUMN IF EXISTS __placeholder__;';
      },
    ],
  ]),
  transpileAbsenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>) => `DROP TABLE IF EXISTS ${apiObject.spec.name};`,
    ],
  ]),
};

export default kind;
