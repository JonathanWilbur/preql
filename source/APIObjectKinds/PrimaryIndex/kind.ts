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
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  // This differs from validateIndex in requiring all key columns to not be null.
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase) => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new Error(
        `No Databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (apiObject.spec.entityName && !matchingResource(apiObject.spec.entityName, 'entity', etcd)) {
      throw new Error(
        `No Entities found that are named '${apiObject.spec.entityName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to be associated with.`,
      );
    }
    if (!matchingResource(apiObject.spec.structName, 'struct', etcd)) {
      throw new Error(
        `No structs found that are named '${apiObject.spec.structName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }

    const attributes: APIObject<AttributeSpec>[] | undefined = etcd.kindIndex.attribute;
    if (!attributes) {
      throw new Error(
        `No attributes found for ${apiObject.kind} '${apiObject.metadata.name}' `
        + 'to index.',
      );
    }
    // Check that the columns are real
    // eslint-disable-next-line
    apiObject.spec.keyColumns.forEach((kc: any): void => {
      const attributeFound: APIObject<AttributeSpec> | undefined = attributes
        .find((attr): boolean => attr.spec.name === kc.name);
      if (!attributeFound) {
        throw new Error(`No attribute named '${kc.name}' for ${apiObject.kind} '${apiObject.metadata.name}' to index.`);
      }
      if (attributeFound.spec.nullable) {
        throw new Error(`Nullable attribute '${kc.name}' may not be used in ${apiObject.kind} '${apiObject.metadata.name}'.`);
      }
    });
  },
};

export default kind;
