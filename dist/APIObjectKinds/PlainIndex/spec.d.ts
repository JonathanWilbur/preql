export default interface Spec {
    name: string;
    structName: string;
    entityName?: string;
    databaseName: string;
    clustered: boolean;
    keyColumns: {
        name: string;
        ascending: boolean;
    }[];
    includedColumns?: {
        name: string;
        ascending: boolean;
    }[];
}
