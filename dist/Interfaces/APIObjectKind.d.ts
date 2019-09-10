import APIObject from "./APIObject";
import APIObjectDatabase from "./APIObjectDatabase";
/**
 * An interface that requires two methods for validating an API object
 * supplied to PreQL. The first method, `validateStructure`, checks that the
 * object alone matches some JSON schema, and possibly other preliminary
 * validations. The second method, `validateSemantics` ensures that constraints
 * across objects in a database are satisfied, such as ensuring that a `Struct`
 * refers to a `Database` that actually exists.
 *
 * The reason that the validation logic is split into two like this is so that
 * all objects can first be indexed into the database, then cross-object
 * constraints can be validated afterwards, using the database's indexes.
 */
export default interface APIObjectKind {
    readonly validateStructure: (apiObject: APIObject) => Promise<void>;
    readonly validateSemantics: (apiObject: APIObject, etcd: APIObjectDatabase) => Promise<void>;
}
//# sourceMappingURL=APIObjectKind.d.ts.map