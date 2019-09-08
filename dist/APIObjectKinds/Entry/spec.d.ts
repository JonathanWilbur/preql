export default interface Spec {
    databaseName: string;
    structName: string;
    id: number;
    distinguishedName?: string;
    values: {
        [name: string]: boolean | number | string;
    };
}
//# sourceMappingURL=spec.d.ts.map