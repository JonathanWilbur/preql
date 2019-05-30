export default
interface APIObjectMetadata {
  name: string;
  /**
   * If not supplied by a user, namespace defaults to 'default'. Still,
   * namespaces are not used by every resource.
   */
  namespace: string;
  labels: Map<string, string>;
  annotations: Map<string, string>;
  uid?: string;
};
