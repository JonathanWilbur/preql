/**
 * The interface for the `metadata` section of all API objects used by PreQL.
 */
export default
interface APIObjectMetadata {
    readonly name: string;
    /**
     * If not supplied by a user, namespace defaults to 'default'. Still,
     * namespaces are not used by every resource.
     */
    readonly namespace: string;
    readonly labels: Record<string, string>;
    readonly annotations: Record<string, string>;
    readonly uid?: string;
}
