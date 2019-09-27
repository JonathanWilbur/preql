"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * For an `OBJECT IDENTIFIER`, limitations are imposed by the use of the ITU's
 * Basic Encoding Rules (BER) (as specified in publication X.690) in LDAP,
 * which limit the first arc to being 0, 1, or 2, and the second arc being no
 * higher than 39 if the first arc is 0 or 1 or 175 if the first arc is 2.
 *
 * @see [ITU X.660](https://www.itu.int/rec/T-REC-X.660-201107-I/en).
 */
const objectIdentifierRegexString = "^[0-2]\\.(0|(?:[1-9]\\d?))(\\.(0|(?:[1-9]\\d*)))+$";
exports.default = objectIdentifierRegexString;
//# sourceMappingURL=objectIdentifierRegexString.js.map