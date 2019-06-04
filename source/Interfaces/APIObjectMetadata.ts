export default
interface APIObjectMetadata {
  name: string;
  /**
   * If not supplied by a user, namespace defaults to 'default'. Still,
   * namespaces are not used by every resource.
   */
  namespace: string;
  labels: Record<string, string>;
  annotations: Record<string, string>;
  uid?: string;
};
