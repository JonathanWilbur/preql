import APIObjectMetadata from './APIObjectMetadata';

export default
interface APIObject {
  apiVersion: string;
  kind: string;
  metadata: APIObjectMetadata;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any;
};
