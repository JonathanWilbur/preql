/**
 * The `spec` section of a PreQL `Entry`.
 *
 * @see /source/APIObjectKinds/Entry/kind.
 */
export default interface Spec {
    /**
     * The DBMS-friendly name of the `Database` where this `Entry` should be.
     */
    databaseName: string;
    /**
     * The DBMS-friendly name of the `Struct` into which this `Entry` shall be
     * inserted.
     */
    structName: string;
    /**
     * The unique numeric ID of the `Entry`.
     */
    id: number;
    /**
     * The "layer" of this `Entry` in an adjacency list. This can be thought of
     * as the order of insertion. Lower-numbered `Entry`s should be inserted
     * before higher-numbered ones. The lowest number is 0, which corresponds
     * root nodes in an adjacency list.
     */
    layer: number;
    /**
     * The X.500 / LDAP distinguished name of this entry.
     */
    distinguishedName?: string;
    /**
     * A map of `Attribute` names to their values.
     */
    values: {
        [name: string]: boolean | number | string;
    };
}
//# sourceMappingURL=spec.d.ts.map