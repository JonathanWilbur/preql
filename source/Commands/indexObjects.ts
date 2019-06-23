import APIObject from '../Interfaces/APIObject';
import APIObjectDatabase from '../Interfaces/APIObjectDatabase';
import PreqlError from '../PreqlError';
// NOTE: You can just iterate over all keys in the kindIndex afterwards to display unrecognized kinds.

export default
async function indexObjects(objects: APIObject[]): Promise<Record<string, APIObjectDatabase>> {
  const namespaces: Record<string, APIObjectDatabase> = {};
  await Promise.all(objects.map(async (apiObject: APIObject): Promise<void> => {
    const namespaceName: string = apiObject.metadata.namespace || 'default';
    if (!namespaces[namespaceName]) {
      namespaces[namespaceName] = {
        namespace: apiObject.metadata.namespace || 'default',
        kindIndex: {},
        kindNameIndex: {},
        objectsWithInvalidSpecs: [], // Is this even used?
      };
    }
    const namespace: APIObjectDatabase = namespaces[namespaceName];

    const kindName: string = apiObject.kind.toLowerCase();
    const kindIndexReference: APIObject[] | undefined = namespace.kindIndex[kindName];
    if (!kindIndexReference) namespace.kindIndex[kindName] = [apiObject];
    else kindIndexReference.push(apiObject);

    const kindAndName: string = `${kindName}:${apiObject.metadata.name.toLowerCase()}`;
    const kindNameValue: APIObject | undefined = namespace.kindNameIndex[kindAndName];
    if (!kindNameValue) namespace.kindNameIndex[kindAndName] = apiObject;
    else {
      throw new PreqlError(
        'f4c7907d-d613-48e7-9e80-37411d2b8e23',
        `Duplicated name: two objects in namespace '${namespaceName}' of kind `
        + `'${apiObject.kind}' with same name '${apiObject.metadata.name}'.`,
      );
    }

    return Promise.resolve();
  }));
  return Promise.resolve(namespaces);
};
