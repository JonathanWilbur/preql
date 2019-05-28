import APIObject from './APIObject';
import APIObjectIndex from './APIObjectIndex';

export default
interface APIObjectDatabase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allObjects: APIObject<any>[];
  kindIndex: APIObjectIndex;
  pathIndex: APIObjectIndex;
};
