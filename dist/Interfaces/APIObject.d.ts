import APIObjectMetadata from "./APIObjectMetadata";
/**
 * The interface for all API objects used by PreQL. This interface is borrowed
 * from how [Kubernetes](https://kubernetes.io/) structures API objects.
 */
export default interface APIObject<T = any> {
    /**
     * A version identifier, which should always start with "preql" for PreQL
     * API objects, followed by a forward slash, and then a
     * [semantic version](https://semver.org/) identifying the version of the
     * PreQL API that should be used to process that object.
     */
    readonly apiVersion: string;
    /**
     * An identifier of the type of the object. This can be thought of as the
     * "class" of the object.
     */
    readonly kind: string;
    /**
     * A section of the object for storing metadata, such as free-text
     * annotations, labels for use by programs, unique names, identifiers,
     * and namespace information.
     */
    readonly metadata: APIObjectMetadata;
    /**
     * The actual object's specification. The contents of this section will
     * vary based on the `kind` of the object.
     */
    readonly spec: T;
}
//# sourceMappingURL=APIObject.d.ts.map