import APIObject from '../Interfaces/APIObject';
import APIObjectDatabase from '../Interfaces/APIObjectDatabase';
import AttributeSpec from './Attribute/spec';
import PreqlError from '../PreqlError';

export default
async function validateIndex(obj: APIObject, etcd: APIObjectDatabase): Promise<void> {
  const databasePath: string = obj.spec.databaseName.toLowerCase();
  const entityPath: string = `${obj.spec.databaseName}.$${obj.spec.entityName}`.toLowerCase();
  const structPath: string = [obj.spec.databaseName, obj.spec.structName].join('.').toLowerCase();

  if (!etcd.pathIndex[databasePath]) {
    throw new PreqlError(
      '37caf6cd-29d8-45ef-8697-f73ce1ee23ae',
      `No Databases found that are named '${obj.spec.databaseName}' for ${obj.kind} `
      + `'${obj.metadata.name}' to attach to.`,
    );
  }
  if (obj.spec.entityName && !etcd.pathIndex[entityPath]) {
    throw new PreqlError(
      '8f3b2610-3308-4b65-b180-ead4f452c9c1',
      `No Entities found that are named '${obj.spec.entityName}' for ${obj.kind} `
      + `'${obj.metadata.name}' to be associated with.`,
    );
  }
  if (!etcd.pathIndex[structPath]) {
    throw new PreqlError(
      'bc7692ff-9eb1-4258-b9ac-d95b1448153f',
      `No Structs found that are named '${obj.spec.structName}' for ${obj.kind} `
      + `'${obj.metadata.name}' to attach to.`,
    );
  }

  const attributes: APIObject<AttributeSpec>[] | undefined = etcd.kindIndex.attribute;
  if (!attributes) {
    throw new PreqlError(
      'fbee0ffc-6969-4548-bd8d-72a5c189e0e6',
      `No Attributes found for ${obj.kind} '${obj.metadata.name}' `
      + 'to index.',
    );
  }
  // Check that the attributes are real
  // eslint-disable-next-line
  obj.spec.keyAttributes.forEach((kc: any): void => {
    const attributeFound: boolean = attributes.some((attr): boolean => attr.spec.name === kc.name);
    if (!attributeFound) {
      throw new Error(`No Attribute named '${kc.name}' for ${obj.kind} '${obj.metadata.name}' to index.`);
    }
  });
};
