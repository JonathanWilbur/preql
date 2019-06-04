import APIObject from './Interfaces/APIObject';
import APIObjectDatabase from './Interfaces/APIObjectDatabase';

export default
interface APIObjectKind {
  name: string;
  validateStructure: (apiObject: APIObject) => Promise<void>;
  validateSemantics: (apiObject: APIObject, etcd: APIObjectDatabase) => Promise<void>;
};
