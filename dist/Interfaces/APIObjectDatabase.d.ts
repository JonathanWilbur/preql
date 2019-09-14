import APIObject from "./APIObject";
/**
 * The interface for something that arranges the API objects supplied to PreQL.
 * Many other functions use the output of this, rather than a simple list of
 * objects.
 */
export default interface APIObjectDatabase {
    /**
     * The name of the namespace. This identifier should always be normalized
     * to lowercase.
     */
    readonly namespace: string;
    /**
     * An index that maps object `kind`s to an array of objects having that
     * `kind`.
     */
    readonly kindIndex: Record<string, APIObject[]>;
    /**
     * An index that maps the colon-concatenated and lower-cased `kind` and
     * `metadata.name` to a single matching object. This always maps to a
     * single object, because the tuple of the `kind` and `metadata.name` must
     * always be unique for all objects within a namespace.
     */
    readonly kindNameIndex: Record<string, APIObject>;
    /**
     * An index that maps paths to a single object. These paths are generated
     * from the `getPath` command. These paths map to a single object because
     * they must be unique for all objects within a namespace.
     */
    readonly pathIndex: Record<string, APIObject>;
    /**
     * An index that maps [ITU X.660](https://www.itu.int/rec/T-REC-X.660/en)
     * object identifiers (OIDs) to a single object. Object identifiers must
     * be unique for all objects within a namespace. These object identifiers
     * are taken from `spec.objectIdentifier` in the object, if it exists.
     */
    readonly objectIdentifierIndex: Record<string, APIObject>;
    /**
     * An index that maps [ITU X.500](https://www.itu.int/rec/T-REC-X.500/en)
     * distinguished names (DNs) to a single object. Distinguished names must
     * be unique for all objects within a namespace. These distinguished names
     * are taken from `spec.distinguishedName` in the object, if it exists.
     */
    readonly distinguishedNameIndex: Record<string, APIObject>;
}
//# sourceMappingURL=APIObjectDatabase.d.ts.map