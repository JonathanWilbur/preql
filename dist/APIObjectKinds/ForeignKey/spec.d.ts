/**
 * The `spec` section of a PreQL `ForeignKey`.
 *
 * @see /source/APIObjectKinds/ForeignKey/kind.
 */
export default interface Spec {
    /**
     * The DBMS-friendly name of the `Database` in which this belongs.
     *
     * @see /source/APIObjectKinds/Database/kind
     */
    databaseName: string;
    /**
     * The DBMS-friendly name of the `Struct` to which this should "point."
     *
     * @see /source/APIObjectKinds/Struct/kind
     */
    parentStructName: string;
    /**
     * The DBMS-friendly name of the `Struct` in which this should exist.
     *
     * @see /source/APIObjectKinds/Struct/kind
     */
    childStructName: string;
    /**
     * The DBMS-friendly name.
     */
    name: string;
    /**
     * Whether this can be null.
     */
    nullable: boolean;
    /**
     * What to do when this `ForeignKey` is deleted.
     */
    onDeleteAction: string;
    /**
     * What to do when this `ForeignKey` is updated.
     */
    onUpdateAction: string;
    /**
     * The [ITU X.660](https://www.itu.int/rec/T-REC-X.660/en) Object
     * Identifier of this `ForeignKey`.
     */
    objectIdentifier?: string;
    /**
     * Alternative names for this `ForeignKey`, which are primarily used in
     * X.500 / LDAP directories, where multiple names can be used for the
     * same attributes.
     */
    otherNames?: string[];
}
//# sourceMappingURL=spec.d.ts.map