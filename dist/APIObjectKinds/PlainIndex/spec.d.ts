/**
 * The `spec` section of a PreQL `PlainIndex`.
 *
 * @see /source/APIObjectKinds/PlainIndex/kind.
 */
export default interface Spec {
    /**
     * The DBMS-friendly name of this index.
     */
    name: string;
    /**
     * The DBMS-friendly name of the `Struct` to which this index applies.
     *
     * @see /source/APIObjectKinds/Struct/kind
     */
    structName: string;
    /**
     * The DBMS-friendly name of the `Entity` to which this index applies.
     *
     * @see /source/APIObjectKinds/Entity/kind
     */
    entityName?: string;
    /**
     * The DBMS-friendly name of the `Database` to which this index applies.
     *
     * @see /source/APIObjectKinds/Database/kind
     */
    databaseName: string;
    /**
     * Whether the index should be clustered or not.
     *
     * @see https://docs.microsoft.com/en-us/sql/relational-databases/indexes/clustered-and-nonclustered-indexes-described?view=sql-server-2017.
     */
    clustered: boolean;
    /**
     * Whether this index should be sparse or not.
     *
     * @see https://docs.mongodb.com/manual/core/index-sparse/.
     */
    sparse: boolean;
    /**
     * The `Attributes` that should be indexed.
     *
     * @see /source/APIObjectKinds/Attribute/kind
     */
    keyAttributes: {
        name: string;
        ascending: boolean;
    }[];
    /**
     * The `Attributes` that should be included with the index while not being
     * a part of the index.
     *
     * @see /source/APIObjectKinds/Attribute/kind
     * @see https://docs.microsoft.com/en-us/sql/relational-databases/indexes/create-indexes-with-included-columns?view=sql-server-2017.
     */
    includedAttributes?: {
        name: string;
        ascending: boolean;
    }[];
}
//# sourceMappingURL=spec.d.ts.map