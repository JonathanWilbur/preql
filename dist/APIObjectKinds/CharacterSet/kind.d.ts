import APIObjectKind from "../../Interfaces/APIObjectKind";
/**
 * Represents a specific way of encoding characters into bytes.
 *
 * This kind exists because different DBMSs have different names for the same
 * character sets. This kind maps an arbitrarily-named character set to its
 * real equivalents in the targeted DBMS language.
 */
declare const kind: APIObjectKind;
export default kind;
//# sourceMappingURL=kind.d.ts.map