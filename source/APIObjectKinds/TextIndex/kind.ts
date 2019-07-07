import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import matchingResource from '../matchingResource';
import AttributeSpec from '../Attribute/spec';
import PreqlError from '../../PreqlError';
import ajv from '../../ajv';
import DataTypeSpec from '../DataType/spec';

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject, etcd: APIObjectDatabase) => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new PreqlError(
        '37caf6cd-29d8-45ef-8697-f73ce1ee23ae',
        `No Databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (apiObject.spec.entityName && !matchingResource(apiObject.spec.entityName, 'entity', etcd)) {
      throw new PreqlError(
        '8f3b2610-3308-4b65-b180-ead4f452c9c1',
        `No Entities found that are named '${apiObject.spec.entityName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to be associated with.`,
      );
    }
    if (!matchingResource(apiObject.spec.structName, 'struct', etcd)) {
      throw new PreqlError(
        'bc7692ff-9eb1-4258-b9ac-d95b1448153f',
        `No Structs found that are named '${apiObject.spec.structName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }

    const attributes: APIObject<AttributeSpec>[] | undefined = etcd.kindIndex.attribute;
    if (!attributes) {
      throw new PreqlError(
        'fbee0ffc-6969-4548-bd8d-72a5c189e0e6',
        `No Attributes found for ${apiObject.kind} '${apiObject.metadata.name}' to index.`,
      );
    }
    // Check that the columns are real and of string-ish type
    // eslint-disable-next-line
    apiObject.spec.keyColumns.forEach((kc: any): void => {
      const attribute: APIObject<AttributeSpec> | undefined = attributes
        .find((attr): boolean => attr.spec.name === kc.name);
      if (!attribute) {
        throw new Error(`No Attribute named '${kc.name}' for ${apiObject.kind} '${apiObject.metadata.name}' to index.`);
      }
      const kindAndName: string = `datatype:${attribute.spec.type.toLowerCase()}`;
      const dataType: APIObject<DataTypeSpec> | undefined = etcd.kindNameIndex[kindAndName];
      if (!dataType) {
        throw new PreqlError(
          '06fc9208-5772-47d6-8747-dffa6ac58d42',
          `No such DataType '${attribute.spec.type}'.`,
        );
      }
      if (dataType.spec.jsonEquivalent !== 'string') {
        throw new PreqlError(
          '8ab69478-d407-4a60-95ce-d3dd248cc5ce',
          `TextIndex '${apiObject.metadata.name}' cannot use Attribute `
          + `'${attribute.metadata.name}' because it DataType `
          + `'${dataType.metadata.name}' is not fundamentally string-like, `
          + "as determined by the DataType's `jsonEquivalent` property.",
        );
      }
    });
  },
};

export default kind;
