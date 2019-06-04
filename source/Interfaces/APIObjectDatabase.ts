import APIObject from './APIObject';

export default
interface APIObjectDatabase {
  namespace: string;
  kindIndex: Record<string, APIObject[]>;
  kindNameIndex: Record<string, APIObject>;
  objectsWithInvalidSpecs: APIObject[];
};
