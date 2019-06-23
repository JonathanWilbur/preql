import APIObject from '../Interfaces/APIObject';
import APIObjectDatabase from '../Interfaces/APIObjectDatabase';
import matchingResource from './matchingResource';
import AttributeSpec from './Attribute/spec';

export default
async function validateIndex(apiObject: APIObject, etcd: APIObjectDatabase): Promise<void> {
  if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
    throw new Error(
      `No databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
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
    const attributeFound: boolean = attributes.some((attr): boolean => attr.spec.name === kc.name);
    if (!attributeFound) {
      throw new Error(`No attribute named '${kc.name}' for ${apiObject.kind} '${apiObject.metadata.name}' to index.`);
    }
  });
};
