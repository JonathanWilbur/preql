import APIObject from '../Interfaces/APIObject';

export default async function
getPath(obj: APIObject): Promise<string | undefined> {
  let path: string;
  if (!obj || !obj.spec || typeof obj.spec !== 'object') return undefined;
  if ('databaseName' in obj.spec && typeof obj.spec.databaseName === 'string') {
    path = obj.spec.databaseName;
  } else {
    return undefined;
  }
  if ('structName' in obj.spec && typeof obj.spec.structName === 'string') {
    path += `.${obj.spec.structName}`;
  }
  if ('name' in obj.spec && typeof obj.spec.name === 'string') {
    path += `.${obj.spec.name}`;
  }
  return path;
};
