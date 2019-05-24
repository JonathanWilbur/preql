import APIObject from './Interfaces/APIObject';
import APIObjectDatabase from './Interfaces/APIObjectDatabase';

export default
interface APIObjectKind {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateStructure: (apiObject: APIObject<any>, etcd: APIObjectDatabase) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateSemantics: (apiObject: APIObject<any>, etcd: APIObjectDatabase) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transpilePresenceIn: Map<string, (apiObject: APIObject<any>, etcd: APIObjectDatabase) => string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transpileAbsenceIn: Map<string, (apiObject: APIObject<any>, etcd: APIObjectDatabase) => string>;
};
