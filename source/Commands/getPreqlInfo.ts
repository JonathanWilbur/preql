import kinds from "../APIObjectKinds/index";
import timezones from "../timezones";
import iso639LanguageCodes from "../iso639LanguageCodes";
import iso3166CountryCodes from "../iso3166CountryCodes";
import prohibitedIdentifiers from "../prohibitedIdentifiers";
import objectIdentifierRegexString from "../objectIdentifierRegexString";
import identifierRegexString from "../identifierRegexString";
import version, { MAJOR_VERSION, MINOR_VERSION, PATCH_VERSION } from "../version";
import Casing from "../APIObjectKinds/DataType/Casing";
// import dataTypeSchema from '../APIObjectKinds/DataType/schema';
import ajvOptions from "../ajvOptions";

/**
 * A function for returning enum values and configuration information all at
 * once. This was mainly created for diagnostic / telemetry purposes, but it
 * could conceivably be used for other things.
 *
 * @returns {object} An object containing configuration information.
 */
export default
function getPreqlInfo (): object {
    return {
        version,
        majorVersion: MAJOR_VERSION,
        minorVersion: MINOR_VERSION,
        patchVersion: PATCH_VERSION,
        kinds: Object.keys(kinds),
        timezones,
        iso639LanguageCodes,
        iso3166CountryCodes,
        prohibitedIdentifiers,
        objectIdentifierRegexString,
        identifierRegexString,
        casings: Object.keys(Casing) as string[],
        // supportedSetters: dataTypeSchema.properties.setters.items.anyOf.map(s => s.properties.type.enum[0]),
        ajvOptions,
    };
}
