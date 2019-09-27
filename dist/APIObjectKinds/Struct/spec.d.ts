/**
 * The `spec` section of a PreQL `Struct`.
 *
 * @see /source/APIObjectKinds/Struct/kind.
 */
export default interface Spec {
    /**
     * The DBMS-friendly name.
     */
    name: string;
    /**
     * A pluralized DBMS-friendly name.
     */
    pluralName?: string;
    /**
     * The DBMS-friendly name of the `Entity` with which this `Struct` is
     * associated.
     *
     * @see /source/APIObjectKinds/Entity/kind
     */
    entityName?: string;
    /**
     * The DBMS-friendly name of the `Database` with which this `Struct` is
     * associated.
     *
     * @see /source/APIObjectKinds/Database/kind
     */
    databaseName: string;
    /**
     * The DBMS-friendly name of the `CharacterSet` with which this `Struct` is
     * associated.
     *
     * @see /source/APIObjectKinds/CharacterSet/kind
     */
    characterSet?: string;
    /**
     * The DBMS-friendly name of the `Collation` with which this `Struct` is
     * associated.
     *
     * @see /source/APIObjectKinds/Collation/kind
     */
    collation?: string;
    /**
     * The [ITU X.660](https://www.itu.int/rec/T-REC-X.660/en) Object
     * Identifier.
     */
    objectIdentifier?: string;
}
//# sourceMappingURL=spec.d.ts.map