/**
 * The `spec` section of a PreQL `Collation`.
 *
 * @see /source/APIObjectKinds/Collation/kind.
 */
export default interface Collation {
    name: string;
    targetEquivalents: {
        [target: string]: string;
    };
    country?: string;
    language?: string;
    caseSensitive?: boolean;
    accentSensitive?: boolean;
    kanaSensitive?: boolean;
    widthSensitive?: boolean;
    variationSelectorSensitive?: boolean;
    binary?: boolean;
    characterSet?: string;
}
//# sourceMappingURL=spec.d.ts.map