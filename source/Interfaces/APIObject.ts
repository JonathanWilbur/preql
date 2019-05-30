import APIObjectMetadata from './APIObjectMetadata';

export default
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface APIObject<T = any> {
  apiVersion: string;
  kind: string;
  metadata: APIObjectMetadata;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: T;
};
