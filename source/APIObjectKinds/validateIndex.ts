import APIObject from '../Interfaces/APIObject';
import APIObjectDatabase from '../Interfaces/APIObjectDatabase';
import matchingResource from './matchingResource';
import AttributeSpec from './Attribute/spec';
import PreqlError from '../PreqlError';

export default
async function validateIndex(apiObject: APIObject, etcd: APIObjectDatabase): Promise<void> {
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
      `No Attributes found for ${apiObject.kind} '${apiObject.metadata.name}' `
      + 'to index.',
    );
  }
  // Check that the columns are real
  // eslint-disable-next-line
  apiObject.spec.keyColumns.forEach((kc: any): void => {
    const attributeFound: boolean = attributes.some((attr): boolean => attr.spec.name === kc.name);
    if (!attributeFound) {
      throw new Error(`No Attribute named '${kc.name}' for ${apiObject.kind} '${apiObject.metadata.name}' to index.`);
    }
  });
};
