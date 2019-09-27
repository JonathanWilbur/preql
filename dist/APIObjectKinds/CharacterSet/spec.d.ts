/**
 * The `spec` section of a PreQL `CharacterSet`.
 *
 * @see /source/APIObjectKinds/CharacterSet/kind.
 */
export default interface CharacterSet {
    /**
     * The DBMS-friendly name of the character set.
     */
    name: string;
    /**
     * A map of the lower-cased DBMS identifier to the native character set
     * that matches this one.
     */
    targetEquivalents: {
        [target: string]: string;
    };
    /**
     * The ISO 3166 Two-Letter Alphabetic Country Code of the country that is
     * associated with this character set.
     *
     * @see https://www.iso.org/iso-3166-country-codes.html.
     */
    country?: string;
    /**
     * The ISO 639 Two-Letter Alphabetic Language Code of the language that is
     * associated with this character set.
     *
     * @see https://www.iso.org/iso-639-language-codes.html.
     */
    language?: string;
    /**
     * The default `Collation` to use with this `CharacterSet` if one is not
     * specified.
     *
     * @see /source/APIObjectKinds/Collation/kind
     */
    defaultCollation?: string;
    /**
     * The largest number of bytes on which a character can be encoded in this
     * `CharacterSet`.
     */
    maximumCharacterLength?: number;
}
//# sourceMappingURL=spec.d.ts.map