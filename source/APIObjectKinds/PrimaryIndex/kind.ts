import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import schema from './schema';
import Spec from './spec';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import matchingResource from '../matchingResource';
import AttributeSpec from '../Attribute/spec';
import PreqlError from '../../PreqlError';
import ajv from '../../ajv';

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  // This differs from validateIndex in requiring all key columns to not be null.
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase) => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new PreqlError(
        'a67d4ef8-7f69-4079-a4a5-8ab3db6dde00',
        `No Databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (apiObject.spec.entityName && !matchingResource(apiObject.spec.entityName, 'entity', etcd)) {
      throw new PreqlError(
        'ed2c6aa5-2a18-4d58-ae20-a05cc31b9236',
        `No Entities found that are named '${apiObject.spec.entityName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to be associated with.`,
      );
    }
    if (!matchingResource(apiObject.spec.structName, 'struct', etcd)) {
      throw new PreqlError(
        '7b277f08-b6ae-4621-9cfb-7f3307099309',
        `No Structs found that are named '${apiObject.spec.structName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }

    const attributes: APIObject<AttributeSpec>[] | undefined = etcd.kindIndex.attribute;
    if (!attributes) {
      throw new PreqlError(
        'b5bbdd1a-cbac-401f-8a86-d5c8eb0c350e',
        `No Attributes found for ${apiObject.kind} '${apiObject.metadata.name}' `
        + 'to index.',
      );
    }
    // Check that the columns are real
    // eslint-disable-next-line
    apiObject.spec.keyColumns.forEach((kc: any): void => {
      const attributeFound: APIObject<AttributeSpec> | undefined = attributes
        .find((attr): boolean => attr.spec.name === kc.name);
      if (!attributeFound) {
        throw new PreqlError(
          '5f7cdf95-7511-47ff-a89b-af1d614a771a',
          `No Attribute named '${kc.name}' for ${apiObject.kind} '${apiObject.metadata.name}' to index.`,
        );
      }
      if (attributeFound.spec.nullable) {
        throw new PreqlError(
          'a2a20acc-e3b7-4e94-8a6b-00d3f01756ea',
          `Nullable Attribute '${kc.name}' may not be used in ${apiObject.kind} '${apiObject.metadata.name}'.`,
        );
      }
    });
  },
};

export default kind;
