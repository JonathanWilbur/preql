import APIObject from './APIObject';

export default
interface APIObjectDatabase {
  readonly namespace: string;
  readonly kindIndex: Record<string, APIObject[]>;
  readonly kindNameIndex: Record<string, APIObject>;
};
