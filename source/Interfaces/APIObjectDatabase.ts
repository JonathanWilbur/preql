import APIObject from './APIObject';

export default
interface APIObjectDatabase {
  namespace: string;
  // apiVersionIndex: Map<string, APIObject[]>;
  kindIndex: Map<string, APIObject[]>;
  kindNameIndex: Map<string, APIObject>; // (kind:metadata.name)
  objectsWithInvalidSpecs: APIObject[];
};
