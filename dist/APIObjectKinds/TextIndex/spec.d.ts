/**
 * The `spec` section of a PreQL `TextIndex`.
 *
 * @see /source/APIObjectKinds/TextIndex/kind.
 */
export default interface Spec {
    name: string;
    structName: string;
    entityName?: string;
    databaseName: string;
    clustered: boolean;
    sparse: boolean;
    keyAttributes: {
        name: string;
        ascending: boolean;
    }[];
    includedAttributes?: {
        name: string;
        ascending: boolean;
    }[];
}
//# sourceMappingURL=spec.d.ts.map