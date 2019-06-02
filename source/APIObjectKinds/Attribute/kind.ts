import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import matchingResource from '../matchingResource';
import DataTypeSpec from '../DataType/spec';
import transpile from '../DataType/transpile';
import printf from '../DataType/printf';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'Attribute',
  getPath: (apiObject: APIObject<Spec>): string => {
    const databaseName: string = apiObject.spec.databaseName || '';
    const structName: string = apiObject.spec.structName || '';
    const attributeName: string = apiObject.spec.name || '';
    return `${databaseName}.${structName}.${attributeName}`;
  },
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new Error(
        `No databases found that are named '${apiObject.spec.databaseName}' for attribute `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!matchingResource(apiObject.spec.structName, 'struct', etcd)) {
      throw new Error(
        `No structs found that are named '${apiObject.spec.structName}' for attribute `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
  },
  transpilePresenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>, etcd: APIObjectDatabase) => {
        const datatypes: APIObject[] = etcd.kindIndex.get('datatype') || [];
        if (datatypes.length === 0) {
          throw new Error('No data types defined.');
        }
        let columnString = `ALTER TABLE ${apiObject.spec.databaseName}.${apiObject.spec.structName}\r\n`
          + `ADD COLUMN IF NOT EXISTS ${apiObject.spec.name} `;
        const type: string = apiObject.spec.type.toLowerCase();
        const matchingTypes: APIObject[] = datatypes
          .filter((datatype: APIObject): boolean => datatype.metadata.name.toLowerCase() === type);
        if (matchingTypes.length !== 1) {
          throw new Error(`Data type '${type}' not recognized.`);
        }
        const datatype: APIObject<DataTypeSpec> = matchingTypes[0];
        columnString += transpile('mariadb', datatype, apiObject);
        if (apiObject.spec.nullable) columnString += ' NULL';
        else columnString += ' NOT NULL';
        // Simply quoting the default value is fine, because MariaDB will cast it.
        if (apiObject.spec.default) columnString += ` DEFAULT '${apiObject.spec.default}'`;
        if (apiObject.metadata.annotations && apiObject.metadata.annotations.has('comment')) {
          columnString += `\r\nCOMMENT '${apiObject.metadata.annotations.get('comment')}'`;
        }
        columnString += ';';
        if (datatype.spec.targets.mariadb) {
          if (datatype.spec.targets.mariadb.check) {
            columnString += '\r\n\r\n';
            columnString += datatype.spec.targets.mariadb.check
              .map((expression: string, index: number): string => {
                const qualifiedTableName: string = `${apiObject.spec.databaseName}.${apiObject.spec.structName}`;
                return `ALTER TABLE ${qualifiedTableName}\r\n`
                + `DROP CONSTRAINT IF EXISTS preql_valid_${datatype.metadata.name}_${index};\r\n`
                + `ALTER TABLE ${qualifiedTableName}\r\n`
                + `ADD CONSTRAINT IF NOT EXISTS preql_valid_${datatype.metadata.name}_${index}\r\n`
                + `CHECK (${printf(expression, apiObject)});`;
              })
              .join('\r\n\r\n')
          }
          if (datatype.spec.targets.mariadb.setters) {
            columnString += '\r\n\r\n';
            columnString += datatype.spec.targets.mariadb.setters
              .map((expression: string, index: number): string => {
                const qualifiedTableName: string = `${apiObject.spec.databaseName}.${apiObject.spec.structName}`;
                const formattedExpression: string = printf(expression, apiObject);
                const triggerBaseName = `${apiObject.spec.databaseName}.preql_${datatype.metadata.name}_${index}`;
                return (
                  `DROP TRIGGER IF EXISTS ${triggerBaseName}_insert;\r\n`
                  + `CREATE TRIGGER IF NOT EXISTS ${triggerBaseName}_insert\r\n`
                  + `BEFORE INSERT ON ${qualifiedTableName} FOR EACH ROW\r\n`
                  + `SET NEW.${apiObject.spec.name} = ${formattedExpression};\r\n`
                  + '\r\n'
                  + `DROP TRIGGER IF EXISTS ${triggerBaseName}_update;\r\n`
                  + `CREATE TRIGGER IF NOT EXISTS ${triggerBaseName}_update\r\n`
                  + `BEFORE UPDATE ON ${qualifiedTableName} FOR EACH ROW\r\n`
                  + `SET NEW.${apiObject.spec.name} = ${formattedExpression};`
                );
              })
              .join('\r\n\r\n');
          }
        }
        return columnString;
      },
    ],
  ]),
  transpileAbsenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>) => 'ALTER TABLE '
        + `${apiObject.spec.databaseName}.${apiObject.spec.structName}\r\n`
        + `DROP COLUMN IF EXISTS ${apiObject.spec.name};`,
    ],
  ]),
};

export default kind;
