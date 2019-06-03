import APIObject from '../Interfaces/APIObject';
import APIObjectDatabase from '../Interfaces/APIObjectDatabase';
// You can just iterate over all keys in the kindIndex afterwards to display unrecognized kinds.

export default
async function indexObjects(objects: APIObject[]): Promise<Map<string, APIObjectDatabase>> {
  const namespaces: Map<string, APIObjectDatabase> = new Map<string, APIObjectDatabase>([]);
  await Promise.all(objects
    .map(async (apiObject: APIObject): Promise<void> => {
      if (!namespaces.has(apiObject.metadata.namespace)) {
        namespaces.set(apiObject.metadata.namespace, {
          namespace: apiObject.metadata.namespace,
          // apiVersionIndex: new Map<string, APIObject[]>([]),
          kindIndex: new Map<string, APIObject[]>([]),
          kindNameIndex: new Map<string, APIObject>([]),
          objectsWithInvalidSpecs: [], // Is this even used?
        });
      }
      const namespace: APIObjectDatabase = namespaces.get(apiObject.metadata.namespace) as APIObjectDatabase;

      const kindIndexReference: APIObject[] | undefined = namespace.kindIndex.get(apiObject.kind.toLowerCase());
      if (!kindIndexReference) namespace.kindIndex.set(apiObject.kind.toLowerCase(), [apiObject]);
      else kindIndexReference.push(apiObject);

      const kindAndName: string = `${apiObject.kind.toLowerCase()}:${apiObject.metadata.name.toLowerCase()}`;
      const kindNameValue: APIObject | undefined = namespace.kindNameIndex.get(kindAndName);
      if (!kindNameValue) namespace.kindNameIndex.set(kindAndName, apiObject);
      else {
        throw new Error(
          `Duplicated name: two objects in namespace '${apiObject.metadata.namespace}' of kind `
          + `'${apiObject.kind}' with same name '${apiObject.metadata.name}'.`,
        );
      }

      return Promise.resolve();
    }));
  return Promise.resolve(namespaces);
};
