export default
interface APIObjectMetadata {
  name: string;
  /**
   * The namespace MUST be optional, because not all API objects, such as users
   * and roles, will have an associated namespace.
   */
  namespace?: string;
  labels?: Map<string, string>;
  annotations?: Map<string, string>;
  uid?: string;
};
