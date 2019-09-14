/**
 * The `spec` section of a PreQL `Entry`.
 *
 * @see /source/APIObjectKinds/Entry/kind.
 */
export default interface Spec {
    databaseName: string;
    structName: string;
    id: number;
    layer: number;
    distinguishedName?: string;
    values: {
        [name: string]: boolean | number | string;
    };
}
//# sourceMappingURL=spec.d.ts.map