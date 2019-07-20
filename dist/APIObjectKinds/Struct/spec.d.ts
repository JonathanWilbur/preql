export default interface Spec {
    name: string;
    pluralName?: string;
    entityName?: string;
    databaseName: string;
    characterSet?: string;
    collation?: string;
    objectIdentifier?: string;
}
