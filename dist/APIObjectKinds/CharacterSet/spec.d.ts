/**
 * The `spec` section of a PreQL `CharacterSet`.
 *
 * @see /source/APIObjectKinds/CharacterSet/kind.
 */
export default interface CharacterSet {
    name: string;
    targetEquivalents: {
        [target: string]: string;
    };
    country?: string;
    language?: string;
    defaultCollation?: string;
    maximumCharacterLength?: number;
}
//# sourceMappingURL=spec.d.ts.map