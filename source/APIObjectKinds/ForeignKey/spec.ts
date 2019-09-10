/**
 * The `spec` section of a PreQL `ForeignKey`.
 *
 * @see /source/APIObjectKinds/ForeignKey/kind.
 */
export default
interface Spec {
    databaseName: string;
    parentStructName: string;
    childStructName: string;
    name: string;
    nullable: boolean;
    onDeleteAction: string;
    onUpdateAction: string;
    objectIdentifier?: string;
    otherNames?: string[];
}
