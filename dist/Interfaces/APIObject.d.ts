import APIObjectMetadata from './APIObjectMetadata';
export default interface APIObject<T = any> {
    readonly apiVersion: string;
    readonly kind: string;
    readonly metadata: APIObjectMetadata;
    readonly spec: T;
}
