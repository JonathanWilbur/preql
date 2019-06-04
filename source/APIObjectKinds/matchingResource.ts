import APIObject from '../Interfaces/APIObject';
import APIObjectDatabase from '../Interfaces/APIObjectDatabase';

export default
function matchingResource(name: string, kind: string, etcd: APIObjectDatabase): boolean {
  const matchingResources: APIObject[] | undefined = etcd.kindIndex[kind.toLowerCase()];
  if (!matchingResources) return false;
  return matchingResources.some((database: APIObject): boolean => database.spec.name === name);
};
