/**
 * The `spec` section of a PreQL `Struct`.
 *
 * @see /source/APIObjectKinds/Struct/kind.
 */
export default
interface Spec {

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
     */
    entityName?: string;

    /**
     * The DBMS-friendly name of the `Database` with which this `Struct` is
     * associated.
     */
    databaseName: string;

    /**
     * The DBMS-friendly name of the `CharacterSet` with which this `Struct` is
     * associated.
     */
    characterSet?: string;

    /**
     * The DBMS-friendly name of the `Collation` with which this `Struct` is
     * associated.
     */
    collation?: string;

    /**
     * The ITU X.660 Object Identifier.
     */
    objectIdentifier?: string;
}
