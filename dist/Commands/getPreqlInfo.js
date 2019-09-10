"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../APIObjectKinds/index"));
const timezones_1 = __importDefault(require("../timezones"));
const iso639LanguageCodes_1 = __importDefault(require("../iso639LanguageCodes"));
const iso3166CountryCodes_1 = __importDefault(require("../iso3166CountryCodes"));
const prohibitedIdentifiers_1 = __importDefault(require("../prohibitedIdentifiers"));
const objectIdentifierRegexString_1 = __importDefault(require("../objectIdentifierRegexString"));
const identifierRegexString_1 = __importDefault(require("../identifierRegexString"));
const version_1 = __importStar(require("../version"));
const Casing_1 = __importDefault(require("../APIObjectKinds/DataType/Casing"));
// import dataTypeSchema from '../APIObjectKinds/DataType/schema';
const ajvOptions_1 = __importDefault(require("../ajvOptions"));
/**
 * A function for returning enum values and configuration information all at
 * once. This was mainly created for diagnostic / telemetry purposes, but it
 * could conceivably be used for other things.
 *
 * @returns {object} An object containing configuration information.
 */
function getPreqlInfo() {
    return {
        version: version_1.default,
        majorVersion: version_1.MAJOR_VERSION,
        minorVersion: version_1.MINOR_VERSION,
        patchVersion: version_1.PATCH_VERSION,
        kinds: Object.keys(index_1.default),
        timezones: timezones_1.default,
        iso639LanguageCodes: iso639LanguageCodes_1.default,
        iso3166CountryCodes: iso3166CountryCodes_1.default,
        prohibitedIdentifiers: prohibitedIdentifiers_1.default,
        objectIdentifierRegexString: objectIdentifierRegexString_1.default,
        identifierRegexString: identifierRegexString_1.default,
        casings: Object.keys(Casing_1.default),
        // supportedSetters: dataTypeSchema.properties.setters.items.anyOf.map(s => s.properties.type.enum[0]),
        ajvOptions: ajvOptions_1.default,
    };
}
exports.default = getPreqlInfo;
//# sourceMappingURL=getPreqlInfo.js.map