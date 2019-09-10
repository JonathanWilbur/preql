import APIObjectMetadata from "./APIObjectMetadata";
/**
 * The interface for all API objects used by PreQL.
 */
export default interface APIObject<T = any> {
    readonly apiVersion: string;
    readonly kind: string;
    readonly metadata: APIObjectMetadata;
    readonly spec: T;
}
//# sourceMappingURL=APIObject.d.ts.map