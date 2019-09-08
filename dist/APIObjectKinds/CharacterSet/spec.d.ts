/**
 * This kind exists because different DBMSs have different names for the same
 * character sets. This kind maps an arbitrarily-named character set to its
 * real equivalents in the targeted DBMS language.
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