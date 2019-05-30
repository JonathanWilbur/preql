import APIObject from './APIObject';
import APIObjectIndex from './APIObjectIndex';

export default
interface APIObjectDatabase {
  allObjects: APIObject[];
  kindIndex: APIObjectIndex;
  pathIndex: APIObjectIndex;
};
