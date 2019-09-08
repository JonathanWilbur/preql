/**
 * For an `OBJECT IDENTIFIER`, limitations are imposed by the use of the ITU's
 * Basic Encoding Rules (BER) (as specified in publication X.690) in LDAP,
 * which limit the first arc to being 0, 1, or 2, and the second arc being no
 * higher than 39 if the first arc is 0 or 1 or 175 if the first arc is 2.
 */
declare const objectIdentifierRegexString: string;
export default objectIdentifierRegexString;
//# sourceMappingURL=objectIdentifierRegexString.d.ts.map