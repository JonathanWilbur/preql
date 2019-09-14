"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The string form of a regular expression that describes valid identifiers
 * used throughout PreQL. These identifiers are used for `Database` names,
 * `Struct` names, `Attribute` names, and more.
 */
const identifierRegexString = "^[A-Za-z](?:[A-Za-z0-9_]{0,28}[A-Za-z0-9])?$";
exports.default = identifierRegexString;
//# sourceMappingURL=identifierRegexString.js.map