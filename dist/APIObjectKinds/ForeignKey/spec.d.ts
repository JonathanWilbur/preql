export default interface Spec {
    databaseName: string;
    parentStruct: string;
    childStruct: string;
    attributeName: string;
    onDeleteAction: string;
    onUpdateAction: string;
}
