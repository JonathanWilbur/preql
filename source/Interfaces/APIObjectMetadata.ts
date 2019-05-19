export default
interface APIObjectMetadata {
  name: string;
  namespace: string;
  labels: Map<string, string>;
  annotations: Map<string, string>;
  uid?: string;
};
