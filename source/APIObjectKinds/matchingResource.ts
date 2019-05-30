import APIObject from '../Interfaces/APIObject';
import APIObjectDatabase from '../Interfaces/APIObjectDatabase';

export default
function matchingResource(name: string, kind: string, etcd: APIObjectDatabase): boolean {
  // eslint-disable-next-line
  const matchingResources: APIObject<any>[] | undefined = etcd.kindIndex.get(kind.toLowerCase());
  if (!matchingResources) return false;
  // eslint-disable-next-line
  return matchingResources.some((database: APIObject<any>): boolean => database.spec.name === name);
};
