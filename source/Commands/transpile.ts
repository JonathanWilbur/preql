import * as semver from 'semver';
import APIObject from '../Interfaces/APIObject';
import APIObjectKind from '../APIObjectKind';
import kinds from '../APIObjectKinds';
import targets from '../Targets';
import Target from '../Target';
import logger from '../Loggers/ConsoleLogger';
import PREQL_VERSION from '../version';

// TODO: Implement error handling here.
const main = async (namespace: string, dialect: string, objects: APIObject[]): Promise<{ value: string }> => {
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
    allObjects: [] as APIObject[],
    kindIndex: new Map<string, APIObject[]>([]),
    pathIndex: new Map<string, APIObject[]>([]),
  };

  objects.forEach((obj: APIObject): void => {
    if (obj.apiVersion.indexOf('preql/') !== 0) {
      throw new Error('All objects used by PreQL must have an apiVersion that starts with "preql/".');
    }
    if (!semver.satisfies(obj.apiVersion.replace('preql/', ''), `<=${PREQL_VERSION}`)) {
      throw new Error(`Version number '${obj.apiVersion}' is too high for this version of PreQL to handle.`);
    }
  });

  const objectsWithinSelectedNamespace: APIObject[] = objects
    .filter((apiOject: APIObject): boolean => (apiOject.metadata.namespace || 'default') === namespace);

  const encounteredNames: Set<string> = new Set([]);
  await Promise.all(objectsWithinSelectedNamespace
    .map(async (apiObject: APIObject): Promise<void> => {
      const kind : APIObjectKind | undefined = kinds.get(apiObject.kind.toLowerCase());
      if (!kind) {
        logger.warn(`Kind '${apiObject.kind}' not recognized.`);
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

      const kindIndexReference: APIObject[] | undefined = etcd.kindIndex.get(apiObject.kind.toLowerCase());
      if (!kindIndexReference) {
        etcd.kindIndex.set(apiObject.kind.toLowerCase(), [apiObject]);
      } else {
        if (encounteredNames.has(apiObject.metadata.name)) {
          throw new Error(
            `Duplicated name: two objects in namespace '${namespace}' of kind `
            + `'${apiObject.kind}' with same name '${apiObject.metadata.name}'.`,
          );
        }
        kindIndexReference.push(apiObject);
      }
      encounteredNames.add(apiObject.metadata.name);

      const path: string = kind.getPath(apiObject);
      const pathIndexReference: APIObject[] | undefined = etcd.pathIndex.get(path);
      if (!pathIndexReference) {
        etcd.pathIndex.set(path, [apiObject]);
      } else {
        pathIndexReference.push(apiObject);
      }

      etcd.allObjects.push(apiObject);
      return Promise.resolve();
    }));

  await Promise.all(
    Array.from(etcd.kindIndex.keys())
      .map(async (kindName: string): Promise<void> => {
        const kind : APIObjectKind | undefined = kinds.get(kindName);
        if (!kind) return Promise.reject();
        const objectsOfMatchingKind: APIObject[] | undefined = etcd.kindIndex.get(kindName);
        if (!objectsOfMatchingKind) return Promise.reject();
        await Promise
          .all(objectsOfMatchingKind
            .map((oomk): Promise<void> => kind.validateSemantics(oomk, etcd)));
        return Promise.resolve();
      }),
  );

  const targetTranspiler: Target | undefined = targets.get(dialect);
  if (!(targetTranspiler)) throw new Error(`Target '${dialect}' not understood.`);
  Object.freeze(etcd);
  return { value: targetTranspiler.transpile(etcd) };
}

export default main;
