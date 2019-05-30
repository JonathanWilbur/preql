import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import StructSpec from '../Struct/spec';
import DatabaseSpec from '../Database/spec';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'Entity',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPath: (apiObject: APIObject<Spec>): string => {
    const databaseName: string = apiObject.spec.databaseName || '';
    const entityName: string = apiObject.spec.name || '';
    return `${databaseName}.${entityName}`;
  },
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    const databases: APIObject<DatabaseSpec>[] | undefined = etcd.kindIndex.get('database');
    if (!databases) {
      throw new Error(`No databases defined for Entity '${apiObject.metadata.name}' to attach to.`)
    }
    const matchingDatabaseFound: boolean = databases
      .some((database: APIObject<DatabaseSpec>): boolean => database.spec.name === apiObject.spec.databaseName);
    if (!matchingDatabaseFound) {
      throw new Error(
        `No databases found that are named '${apiObject.spec.databaseName}' for Entity `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }

    const structs: APIObject<StructSpec>[] | undefined = etcd.kindIndex.get('struct');
    if (!structs) {
      throw new Error(`No structs defined for Entity '${apiObject.metadata.name}' to attach to.`)
    }
    const matchingStructsFound: boolean = structs
      .some((struct: APIObject<StructSpec>): boolean => apiObject.spec.rootStruct === struct.metadata.name);
    if (!matchingStructsFound) {
      throw new Error(
        `No structs found that are named '${apiObject.spec.rootStruct}' for Entity `
        + `'${apiObject.metadata.name}' to use as the root struct.`,
      );
    }
  },
  transpilePresenceIn: new Map([
    [
      'mariadb',
      () => '',
    ],
  ]),
  transpileAbsenceIn: new Map([
    [
      'mariadb',
      () => '',
    ],
  ]),
};

export default kind;
