import APIObjectMetadata from "./APIObjectMetadata";

export default
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface APIObject<T = any> {
    readonly apiVersion: string;
    readonly kind: string;
    readonly metadata: APIObjectMetadata;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly spec: T;
}
