import APIObject from './Interfaces/APIObject';
import APIObjectDatabase from './Interfaces/APIObjectDatabase';

export default
interface APIObjectKind {
  name: string;
  validateStructure: (apiObject: APIObject) => Promise<void>;
  validateSemantics: (apiObject: APIObject, etcd: APIObjectDatabase) => Promise<void>;
  transpilePresenceIn: Map<string, (apiObject: APIObject, etcd: APIObjectDatabase) => string>;
  transpileAbsenceIn: Map<string, (apiObject: APIObject, etcd: APIObjectDatabase) => string>;
};
