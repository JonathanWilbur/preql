import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import dataTypes from '../../DataTypes/index';
import logger from '../../Loggers/ConsoleLogger';
import DatabaseSpec from '../Database/spec';
import StructSpec from '../Struct/spec';

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
    const databases: APIObject<DatabaseSpec>[] | undefined = etcd.kindIndex.get('database');
    if (!databases) {
      throw new Error(`No databases defined for attribute '${apiObject.metadata.name}' to attach to.`);
    }
    const matchingDatabaseFound: boolean = databases
      .some((database: APIObject<DatabaseSpec>): boolean => database.spec.name === apiObject.spec.databaseName);
    if (!matchingDatabaseFound) {
      throw new Error(
        `No databases found that are named '${apiObject.spec.databaseName}' for attribute `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }

    const structs: APIObject<StructSpec>[] | undefined = etcd.kindIndex.get('struct');
    if (!structs) {
      throw new Error(`No structs defined for attribute '${apiObject.metadata.name}' to attach to.`);
    }
    const matchingStructFound: boolean = structs
      .some((struct: APIObject<StructSpec>): boolean => struct.spec.name === apiObject.spec.structName);
    if (!matchingStructFound) {
      throw new Error(
        `No structs found that are named '${apiObject.spec.structName}' for attribute `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
  },
  transpilePresenceIn: new Map([
    [
      'mariadb',
      (apiObject: APIObject<Spec>) => {
        let columnString = `ALTER TABLE ${apiObject.spec.databaseName}.${apiObject.spec.structName}\r\n`
          + `ADD COLUMN IF NOT EXISTS ${apiObject.spec.name} `;
        // columnString += convertPreqlTypeToNativeType(path, spec);
        const type: string = apiObject.spec.type.toLowerCase();
        const path: [ string, string, string ] = [
          apiObject.spec.databaseName,
          apiObject.spec.structName,
          apiObject.spec.name,
        ];
        if (type in dataTypes) {
          columnString += dataTypes[type].mariadb.equivalentNativeType(path, apiObject.spec, logger);
        } else {
          throw new Error(`${path}: Unrecognized type: ${type}`);
        }
        if (apiObject.spec.nullable) columnString += ' NULL';
        else columnString += ' NOT NULL';
        // Simply quoting the default value is fine, because MySQL will cast it.
        if (apiObject.spec.default) columnString += ` DEFAULT '${apiObject.spec.default}'`;
        if (apiObject.metadata.annotations && apiObject.metadata.annotations.has('comment')) {
          columnString += `\r\nCOMMENT '${apiObject.metadata.annotations.get('comment')}'`;
        }
        columnString += ';';
        // logger.debug(path, 'Transpiled.');
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
