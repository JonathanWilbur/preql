export default interface Spec {
    databaseName: string;
    parentStructName: string;
    childStructName: string;
    name: string;
    nullable: string;
    onDeleteAction: string;
    onUpdateAction: string;
    objectIdentifier?: string;
    otherNames?: string[];
}
