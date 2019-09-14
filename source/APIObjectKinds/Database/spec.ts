/**
 * The `spec` section of a PreQL `Database`.
 *
 * @see /source/APIObjectKinds/Database/kind.
 */
export default
interface Spec {

    /**
     * A DBMS-friendly name of this database.
     */
    name: string;

    /**
     * The DBMS-friendly name of the default `CharacterSet` to use for objects
     * in this `Database`.
     */
    characterSet?: string;

    /**
     * The DBMS-friendly name of the default `Collation` to use for objects
     * in this `Database`.
     */
    collation?: string;

    /**
     * The `Server` with which this `Database` is primarily associated.
     */
    serverName?: string;

    /**
     * The largest size, in bytes, that this `Database` can be.
     */
    maximumSizeInBytes?: number;

}
