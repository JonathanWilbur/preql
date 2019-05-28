import APIObject from '../Interfaces/APIObject';
import APIObjectKind from '../APIObjectKind';
import kinds from '../APIObjectKinds';
import targets from '../Targets';
import Target from '../Target';
import logger from '../Loggers/ConsoleLogger';

// TODO: Implement error handling here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const main = async (dialect: string, objects: APIObject<any>[]): Promise<{ value: string }> => {
  /**
   * This is named after etcd, which is the database that Kubernetes uses to
   * store configuration and state information. This etcd serves a similar
   * purpose without being a full-blown database. It could have been an array,
   * but I went with a Map so that objects could be quickly filtered by kind.
   * That said, the key of the etcd map is the kind, and the value is an array
   * of API objects of that kind.
   *
   * This is not pre-populated with keys from all recognized kinds as of now.
   * Care should be taken by developer to ensure that the key exists before
   * attempting to read its value, and care should be taken to ensure that
   * the key is created upon writing if it does not exist.
   */
  const etcd = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    allObjects: [] as APIObject<any>[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kindIndex: new Map<string, APIObject<any>[]>([]),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pathIndex: new Map<string, APIObject<any>[]>([]),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await Promise.all(objects.map(async (apiObject: APIObject<any>): Promise<void> => {
    const kind : APIObjectKind | undefined = kinds.get(apiObject.kind.toLowerCase());
    if (!kind) {
      logger.warn([], `Kind '${apiObject.kind}' not recognized.`);
      return Promise.resolve();
    }
    await kind.validateStructure(apiObject, etcd);

    if (apiObject.metadata.labels) {
      // eslint-disable-next-line no-param-reassign
      apiObject.metadata.labels = new Map(Object.entries(apiObject.metadata.labels));
    }
    if (apiObject.metadata.annotations) {
      // eslint-disable-next-line no-param-reassign
      apiObject.metadata.annotations = new Map(Object.entries(apiObject.metadata.annotations));
    }

    etcd.allObjects.push(apiObject);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kindIndexReference: APIObject<any>[] | undefined = etcd.kindIndex.get(apiObject.kind.toLowerCase());
    if (!kindIndexReference) {
      etcd.kindIndex.set(apiObject.kind.toLowerCase(), [apiObject]);
    } else {
      kindIndexReference.push(apiObject);
    }

    const path: string = kind.getPath(apiObject);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pathIndexReference: APIObject<any>[] | undefined = etcd.pathIndex.get(path);
    if (!pathIndexReference) {
      etcd.pathIndex.set(path, [apiObject]);
    } else {
      pathIndexReference.push(apiObject);
    }
    return Promise.resolve();
  }));

  await Promise.all(
    Array.from(etcd.kindIndex.keys())
      .map(async (kindName: string): Promise<void> => {
        const kind : APIObjectKind | undefined = kinds.get(kindName);
        if (!kind) return Promise.reject();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const objectsOfMatchingKind: APIObject<any>[] | undefined = etcd.kindIndex.get(kindName);
        if (!objectsOfMatchingKind) return Promise.reject();
        await Promise
          .all(objectsOfMatchingKind
            .map((oomk): Promise<void> => kind.validateSemantics(oomk, etcd)));
        return Promise.resolve();
      }),
  );

  const targetTranspiler: Target | undefined = targets.get(dialect);
  if (!(targetTranspiler)) throw new Error(`Target '${dialect}' not understood.`);
  return { value: targetTranspiler.transpile(etcd) };
}

export default main;
