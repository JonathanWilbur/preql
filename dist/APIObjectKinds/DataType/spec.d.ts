import Casing from "./Casing";
import IntegerOverflowBehavior from "./IntegerOverflowBehavior";
/**
 * A setter that strips whitespace around a string.
 */
interface Trim {
    type: "trim";
    /**
     * Which side of the string to trim, which can be "left", "right", or "both."
     */
    side: string;
}
/**
 * A setter that selects only a subsection of a string.
 */
interface Substring {
    type: "substring";
    /**
     * The index where to begin the substring.
     */
    fromIndex: number;
    /**
     * The index where to end the substring. If this is absent, no ending index
     * is used for the substring operation.
     */
    toIndex?: number;
}
/**
 * A setter that replaces a string with another string.
 */
interface Replace {
    type: "replace";
    /**
     * The case-sensitive string to be replaced.
     */
    from: string;
    /**
     * The string to replace the matching string with, where it occurs.
     */
    to: string;
}
/**
 * A setter that changes the casing of a string.
 */
interface Case {
    type: "case";
    /**
     * The type of casing to apply to the string.
     */
    casing: Casing;
}
/**
 * A setter that pads a string with another string to a desired length.
 */
interface Pad {
    type: "pad";
    /**
     * Which side of the string to pad, which can be "left", "right", or
     * "both".
     */
    side: string;
    /**
     * The desired absolute length of the string after the padding is applied.
     */
    padLength: number;
    /**
     * The string to use to pad the string.
     */
    padString: string;
}
/**
 * A setter that sets the value to the current time whenever the `Struct`
 * is updated. This is primarily useful for `lastUpdated` `Attribute`s.
 *
 * The targets will be responsible for intelligently updating the attribute
 * with the correct data type.
*/
interface Now {
    type: "now";
}
/**
 * The specification for a numeric data type.
 */
interface NumberSpec {
    /**
     * The inclusive minimum value of the data type.
     */
    minimum?: number;
    /**
     * The inclusive maximum value of the data type.
     */
    maximum?: number;
    /**
     * @see `TargetMap`.
     */
    targets: TargetMap;
    /**
     * What to do if the number overflows.
     */
    overflowBehavior: IntegerOverflowBehavior;
    /**
     * What to do if the number underflows.
     */
    underflowBehavior: IntegerOverflowBehavior;
}
/**
 * The specification for a string data type.
 */
interface StringSpec {
    /**
     * The inclusive minimum length of the string.
     */
    minLength?: number;
    /**
     * The inclusive maximum length of the string.
     */
    maxLength?: number;
    /**
     * A map of lower-cased regex type identifiers to another map of regex
     * "groups." All regexes within at least one group must match for the
     * string to validate.
     */
    regexes?: {
        /**
         * A lower-cased regex type identifier. `pcre` is the one most commonly
         * used.
         */
        [regexType: string]: {
            /**
             * A group of regular expressions. All regular expressions within
             * at least one group MUST match for the string to validate.
             */
            [groupName: string]: {
                /**
                 * The regular expression.
                 */
                pattern: string;
                /**
                 * Whether the regular expression MUST match. If this is
                 * `false`, the regular expression MUST NOT match.
                 */
                positive: boolean;
            }[];
        };
    };
    /**
     * The transformation operations to apply upon inserting this value.
     */
    setters?: (Trim & Substring & Replace & Case & Pad & Now)[];
    /**
     * @see `TargetMap`.
     */
    targets: TargetMap;
}
/**
 * The specification for an Enum data type.
 *
 * Enum length will be the length of the largest value.
 * Type will typically be CHAR or NCHAR.
 * Length will be limited to 32.
 * Get rid of the Enum kind and just put it in DataType.
 */
interface EnumSpec {
    /**
     * A DBMS-friendly name for this enum, which exists so that RDBMSs can
     * create tables for storing the `Enum` values.
     */
    name: string;
    /**
     * The values that the `Enum` can take on.
     */
    values: string[];
}
/**
 * The mapping of the lower-cased DMBS identifier to the DBMS-specific
 * information about that data type.
 */
interface TargetMap {
    [targetName: string]: {
        /**
         * The native data type.
         * @example
         * "VARCHAR(64)"
         */
        nativeType: string;
        /**
         * The numeric-only dot-delimited object identifier used in X.500
         * directories for identifying how this data type should match against
         * searched values.
         */
        ldapMatchingRule?: string;
        /**
         * The numeric-only dot-delimited object identifier used in X.500
         * directories for identifying how results sorted on this data type
         * ought to be ordered.
         */
        ldapOrderingRule?: string;
        /**
         * The numeric-only dot-delimited object identifier used in X.500
         * directories for identifying how this data type should match against
         * searched substring.
         */
        ldapSubstringMatchingRule?: string;
        /**
         * The numeric-only dot-delimited object identifier used in X.500
         * directories for identifying what attribute an attribute of this
         * data type should inherit from.
         *
         * @see: http://www.openldap.org/doc/admin22/schema.html
         */
        sup?: string;
    };
}
/**
 * The `spec` section of a PreQL `DataType`.
 *
 * @see /source/APIObjectKinds/DataType/kind.
 */
export default interface Spec extends NumberSpec, StringSpec, EnumSpec {
    /**
     * The equivalent data type in JSON, using the exact strings named in the
     * `type` keyword of the JSON Schema specification.
     *
     * @see https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.1.1
     */
    jsonEquivalent: string;
}
export {};
//# sourceMappingURL=spec.d.ts.map