export default interface Spec {
    databaseName: string;
    structName: string;
    values: {
        [name: string]: boolean | number | string;
    };
}
