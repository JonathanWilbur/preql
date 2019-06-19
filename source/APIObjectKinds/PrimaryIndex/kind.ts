import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import schema from './schema';
import Spec from './spec';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import matchingResource from '../matchingResource';
import AttributeSpec from '../Attribute/spec';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'PrimaryIndex',
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  // This differs from validateIndex in requiring all key columns to not be null.
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase) => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new Error(
        `No databases found that are named '${apiObject.spec.databaseName}' for PrimaryIndex `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!matchingResource(apiObject.spec.structName, 'struct', etcd)) {
      throw new Error(
        `No structs found that are named '${apiObject.spec.structName}' for PrimaryIndex `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }

    const columns: APIObject<AttributeSpec>[] | undefined = etcd.kindIndex.attribute;
    if (!columns) {
      throw new Error(
        `No attributes found for PrimaryIndex '${apiObject.metadata.name}' `
        + 'to index.',
      );
    }
    // Check that the columns are real
    // eslint-disable-next-line
    apiObject.spec.keyColumns.forEach((kc: any): void => {
      const columnFound: APIObject<AttributeSpec> | undefined = columns
        .find((column): boolean => column.spec.name === kc.name);
      if (!columnFound) {
        throw new Error(`No attribute named '${kc.name}' for PrimaryIndex '${apiObject.metadata.name}' to index.`);
      }
      if (columnFound.spec.nullable) {
        throw new Error(`Nullable attribute '${kc.name}' may not be used in PrimaryIndex '${apiObject.metadata.name}'.`);
      }
    });
  },
};

export default kind;
