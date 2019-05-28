import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'PrimaryIndex',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPath: (apiObject: APIObject<any>): string => {
    const namespace: string = apiObject.metadata.namespace || '';
    const struct: string = apiObject.metadata.labels ? apiObject.metadata.labels.get('struct') || '' : '';
    const index: string = apiObject.metadata.name;
    return `${namespace}.${struct}.${index}`;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateStructure: (apiObject: APIObject<any>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  // TODO: Log warnings for includedColumns, because they are not used.
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    const labeledNamespace: string | undefined = apiObject.metadata.namespace;
    if (!labeledNamespace) {
      throw new Error(`No metadata.namespace defined for PrimaryIndex '${apiObject.metadata.name}'.`);
    }
    if (!(apiObject.metadata.labels)) {
      throw new Error(
        `PrimaryIndex '${apiObject.metadata.name}' needs labels to associate `
        + 'it to a namespace (database) and struct (table).',
      );
    }
    const labeledStruct: string | undefined = apiObject.metadata.labels.get('struct');
    if (!labeledStruct) {
      throw new Error(`No metadata.namespace defined for PrimaryIndex '${apiObject.metadata.name}'.`);
    }

    // eslint-disable-next-line
    const namespaces: APIObject<any>[] | undefined = etcd.kindIndex.get('namespace');
    if (!namespaces) {
      throw new Error(`No namespaces defined for PrimaryIndex '${apiObject.metadata.name}' to attach to.`);
    }
    const matchingNamespaceFound: boolean = namespaces
      .some((namespace: APIObject<Spec>): boolean => namespace.metadata.name === labeledNamespace);
    if (!matchingNamespaceFound) {
      throw new Error(
        `No namespaces found that are named '${labeledNamespace}' for PrimaryIndex `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }

    // eslint-disable-next-line
    const structs: APIObject<any>[] | undefined = etcd.kindIndex.get('struct');
    if (!structs) {
      throw new Error(`No structs defined for PrimaryIndex '${apiObject.metadata.name}' to attach to.`);
    }
    const matchingStructFound: boolean = structs
      .some((struct: APIObject<Spec>): boolean => struct.metadata.name === labeledStruct);
    if (!matchingStructFound) {
      throw new Error(
        `No structs found that are named '${labeledStruct}' for PrimaryIndex `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }

    // eslint-disable-next-line
    const columns: APIObject<any>[] | undefined = etcd.kindIndex.get('attribute');
    if (!columns) {
      throw new Error(
        `No attributes found for PrimaryIndex '${apiObject.metadata.name}' `
        + 'to index.',
      );
    }

    // Check that the columns are real
    apiObject.spec.keyColumns.forEach((kc): void => {
      const columnFound: boolean = columns.some((column): boolean => column.metadata.name === kc.name);
      if (!columnFound) {
        throw new Error(`No attribute named '${kc.name}' for PrimaryIndex '${apiObject.metadata.name}' to index.`);
      }
    });
  },
  transpilePresenceIn: new Map([
    [
      'mariadb',
      // eslint-disable-next-line
      (apiObject: APIObject<Spec>): string => {
        if (!apiObject.metadata.labels) {
          throw new Error(
            `PrimaryIndex '${apiObject.metadata.name}' needs labels to associate `
            + 'it to a namespace (database) and struct (table).',
          );
        }
        const schemaName: string | undefined = apiObject.metadata.namespace;
        const tableName: string | undefined = apiObject.metadata.labels.get('struct');
        const indexName: string = apiObject.metadata.name;
        const storedProcedureName: string = `create_index_${indexName}`;
        const columnString: string = apiObject.spec.keyColumns
          .map((key): string => `${key.name} ${(key.ascending ? 'ASC' : 'DESC')}`)
          .join(', ');
        return (
          `DROP PROCEDURE IF EXISTS ${storedProcedureName};\r\n`
          + 'DELIMITER $$\r\n'
          + `CREATE PROCEDURE IF NOT EXISTS ${storedProcedureName} ()\r\n`
          + 'BEGIN\r\n'
          + '\tDECLARE EXIT HANDLER FOR 1068 DO 0;\r\n'
          + `\tALTER TABLE ${schemaName}.${tableName}\r\n`
          + `\tADD CONSTRAINT ${indexName} PRIMARY KEY (${columnString});\r\n`
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
      // eslint-disable-next-line
      (apiObject: APIObject<any>) => {
        const schemaName: string | undefined = apiObject.metadata.namespace;
        const tableName: string | undefined = apiObject.metadata.name;
        return `ALTER TABLE ${schemaName}.${tableName} DROP PRIMARY KEY;\r\n\r\n`;
      },
    ],
  ]),
};

export default kind;
