export default interface Spec {
    name: string;
    databaseName: string;
    type: string;
    length?: number;
    objectIdentifier?: string;
    characterSet?: string;
    collation?: string;
    values: {
        value: string;
        index?: number;
    }[];
}
