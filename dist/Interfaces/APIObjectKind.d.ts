import APIObject from './APIObject';
import APIObjectDatabase from './APIObjectDatabase';
export default interface APIObjectKind {
    readonly validateStructure: (apiObject: APIObject) => Promise<void>;
    readonly validateSemantics: (apiObject: APIObject, etcd: APIObjectDatabase) => Promise<void>;
}
//# sourceMappingURL=APIObjectKind.d.ts.map