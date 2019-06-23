import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
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
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new Error(
        `No Databases found that are named '${apiObject.spec.databaseName}' for Struct `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (apiObject.spec.entityName && !matchingResource(apiObject.spec.entityName, 'entity', etcd)) {
      throw new Error(
        `No Entities found that are named '${apiObject.spec.entityName}' for Struct `
        + `'${apiObject.metadata.name}' to be associated with.`,
      );
    }
    const attributeFound: boolean = (etcd.kindIndex.attribute || [])
      .some((attr: APIObject<AttributeSpec>): boolean => (
        attr.spec.databaseName === apiObject.spec.databaseName
        && attr.spec.structName === apiObject.spec.name
      ));
    if (!attributeFound) {
      throw new Error(
        `No Attributes found for Struct '${apiObject.metadata.name}'. Every`
        + ' Struct must have at least one Attribute.',
      );
    }
  },
};

export default kind;
