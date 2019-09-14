/**
 * The `spec` section of a PreQL `Collation`.
 *
 * @see /source/APIObjectKinds/Collation/kind.
 */
export default interface Collation {
    /**
     * The DBMS-friendly name of this `Collation`.
     */
    name: string;
    /**
     * A map of the lower-cased DBMS identifier to the native collation
     * that matches this one.
     */
    targetEquivalents: {
        [target: string]: string;
    };
    /**
     * The ISO 3166 Two-Letter Alphabetic Country Code of the country that is
     * associated with this collation.
     *
     * @see https://www.iso.org/iso-3166-country-codes.html
     */
    country?: string;
    /**
     * The ISO 639 Two-Letter Alphabetic Language Code of the language that is
     * associated with this collation.
     *
     * @see https://www.iso.org/iso-639-language-codes.html.
     */
    language?: string;
    /**
     * Whether this collation is case-sensitive.
     */
    caseSensitive?: boolean;
    /**
     * Whether this collation is accent-sensitive.
     */
    accentSensitive?: boolean;
    /**
     * Whether this collation is kana-sensitive.
     */
    kanaSensitive?: boolean;
    /**
     * Whether this collation is width-sensitive.
     */
    widthSensitive?: boolean;
    /**
     * Whether this collation is variation selector sensitive.
     */
    variationSelectorSensitive?: boolean;
    /**
     * Whether this is a binary collation.
     */
    binary?: boolean;
    /**
     * The DBMS-friendly name of the CharacterSet that is primarily associated
     * with this collation.
     *
     * @see /source/APIObjectKinds/CharacterSet/kind
     */
    characterSet?: string;
}
//# sourceMappingURL=spec.d.ts.map