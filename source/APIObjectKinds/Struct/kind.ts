import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import AttributeSpec from '../Attribute/spec';
import AttributeKind from '../Attribute/kind';
import matchingResource from '../matchingResource';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'Struct',
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
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
