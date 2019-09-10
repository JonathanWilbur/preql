/**
 * The `spec` section of a PreQL `Entity`.
 *
 * @see /source/APIObjectKinds/Entity/kind.
 */
export default
interface Spec {
    name: string;
    pluralName?: string;
    databaseName: string;
    rootStruct: string;
}
