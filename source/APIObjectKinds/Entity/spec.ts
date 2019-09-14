/**
 * The `spec` section of a PreQL `Entity`.
 *
 * @see /source/APIObjectKinds/Entity/kind.
 */
export default
interface Spec {

    /**
     * The DBMS-friendly name of this entity.
     */
    name: string;

    /**
     * A DBMS-friendly pluralized name of this entity.
     */
    pluralName?: string;

    /**
     * The DBMS-friendly name of the `Database` with which this `Entity` should
     * be associated.
     */
    databaseName: string;

    /**
     * The `Struct` that is the root of this `Entity`.
     */
    rootStruct: string;

}
