import APIObject from './Interfaces/APIObject';
import APIObjectDatabase from './Interfaces/APIObjectDatabase';

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
const etcd : APIObjectDatabase = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  absent: new Map<string, APIObject<any>[]>([]),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  present: new Map<string, APIObject<any>[]>([]),
};
export default etcd;
