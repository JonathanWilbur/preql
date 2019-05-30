import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import matchingResource from '../matchingResource';
import AttributeSpec from '../Attribute/spec';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'PlainIndex',
  getPath: (apiObject: APIObject<Spec>): string => {
    const databaseName: string = apiObject.spec.databaseName || '';
    const structName: string = apiObject.spec.structName || '';
    const indexName: string = apiObject.spec.name || '';
    return `${databaseName}.${structName}.${indexName}`;
  },
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  // TODO: Log warnings for includedColumns, because they are not used.
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new Error(
        `No databases found that are named '${apiObject.spec.databaseName}' for PlainIndex `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!matchingResource(apiObject.spec.structName, 'struct', etcd)) {
      throw new Error(
        `No structs found that are named '${apiObject.spec.structName}' for PlainIndex `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    const columns: APIObject<AttributeSpec>[] | undefined = etcd.kindIndex.get('attribute');
    if (!columns) {
      throw new Error(
        `No attributes found for PlainIndex '${apiObject.metadata.name}' `
        + 'to index.',
      );
    }
    // Check that the columns are real
    apiObject.spec.keyColumns.forEach((kc): void => {
      const columnFound: boolean = columns.some((column): boolean => column.spec.name === kc.name);
      if (!columnFound) {
        throw new Error(`No attribute named '${kc.name}' for PlainIndex '${apiObject.metadata.name}' to index.`);
      }
    });
  },
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
