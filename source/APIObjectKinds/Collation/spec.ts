/**
 * This kind exists because different DBMSs have different names for the same
 * collations. This kind maps an arbitrarily-named collation to its
 * real equivalents in the targeted DBMS language.
 */
export default
interface Collation {
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
