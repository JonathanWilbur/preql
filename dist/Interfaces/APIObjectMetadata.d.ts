/**
 * The interface for the `metadata` section of all API objects used by PreQL.
 */
export default interface APIObjectMetadata {
    /**
     * A name for PreQL and related tools to use to handle the object, and
     * to display errors, logs, or other diagnostic data to users, and to
     * search for and index objects. Even if the `spec` has a `name` or
     * name-like member, this should be used for identifying objects within
     * PreQL, for indexing, for logging, and for errors.
     */
    readonly name: string;
    /**
     * A case-insensitive identifier that namespaces objects so that those with
     * duplicated names do not collide.
     *
     * If not supplied by a user, namespace defaults to 'default'. Still,
     * namespaces are not used by every resource.
     */
    readonly namespace: string;
    /**
     * A map of arbitrary key-value pairs that are generally shorter than those
     * used in `metadata.annotations` and intended, or at least more readily
     * usable, for programs.
     */
    readonly labels: Record<string, string>;
    /**
     * A map of arbitrary key-value pairs that are for humans to read, and
     * MUST not be used by programs in any way except being displayed to
     * users.
     */
    readonly annotations: Record<string, string>;
    /**
     * This is not currently used by PreQL, but is present in PreQL just for
     * consistency with the Kubernetes object model. In Kubernetes, this is
     * a UUID.
     */
    readonly uid?: string;
}
//# sourceMappingURL=APIObjectMetadata.d.ts.map