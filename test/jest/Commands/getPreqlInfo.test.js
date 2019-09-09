const getPreqlInfo = require("../../../dist/Commands/getPreqlInfo.js").default;
const semver = require("semver");

describe("getPreqlInfo", () => {
    const info = getPreqlInfo();

    test("getting an object from getPreqlInfo()", () => {
        expect(info).toBeTruthy();
    });

    test("version is a SemVer", () => {
        expect(semver.valid(info.version)).not.toBeNull();
    });

    test("majorVersion is a non-zero integer", () => {
        expect(typeof info.majorVersion).toStrictEqual("number");
        expect(info.majorVersion).not.toBeNaN();
        expect(Number.isSafeInteger(info.majorVersion)).toStrictEqual(true);
        expect(info.majorVersion).toBeGreaterThanOrEqual(1);
    });

    test("minorVersion is a non-zero integer", () => {
        expect(typeof info.minorVersion).toStrictEqual("number");
        expect(info.minorVersion).not.toBeNaN();
        expect(Number.isSafeInteger(info.minorVersion)).toStrictEqual(true);
        expect(info.minorVersion).toBeGreaterThanOrEqual(0);
    });

    test("patchVersion is a non-zero integer", () => {
        expect(typeof info.patchVersion).toStrictEqual("number");
        expect(info.patchVersion).not.toBeNaN();
        expect(Number.isSafeInteger(info.patchVersion)).toStrictEqual(true);
        expect(info.patchVersion).toBeGreaterThanOrEqual(0);
    });

    test("kinds is populated", () => {
        expect(typeof info.kinds).toStrictEqual("object");
        expect(Array.isArray(info.kinds)).toStrictEqual(true);
        expect(info.kinds.length).toBeGreaterThanOrEqual(1);
    });

    test("timezones is populated", () => {
        expect(typeof info.timezones).toStrictEqual("object");
        expect(Array.isArray(info.timezones)).toStrictEqual(true);
        expect(info.timezones.length).toBeGreaterThanOrEqual(1);
    });

    test("iso639LanguageCodes is populated", () => {
        expect(typeof info.iso639LanguageCodes).toStrictEqual("object");
        expect(Array.isArray(info.iso639LanguageCodes)).toStrictEqual(true);
        expect(info.iso639LanguageCodes.length).toBeGreaterThanOrEqual(1);
    });

    test("iso3166CountryCodes is populated", () => {
        expect(typeof info.iso3166CountryCodes).toStrictEqual("object");
        expect(Array.isArray(info.iso3166CountryCodes)).toStrictEqual(true);
        expect(info.iso3166CountryCodes.length).toBeGreaterThanOrEqual(1);
    });

    test("prohibitedIdentifiers is populated", () => {
        expect(typeof info.prohibitedIdentifiers).toStrictEqual("object");
        expect(Array.isArray(info.prohibitedIdentifiers)).toStrictEqual(true);
        expect(info.prohibitedIdentifiers.length).toBeGreaterThanOrEqual(1);
    });

    test("objectIdentifierRegexString is a valid Regex.", () => {
        expect(() => new RegExp(info.objectIdentifierRegexString, "u")).not.toThrow();
    });
    // TODO: Test that objectIdentifierRegexString validates OIDs correctly.

    test("identifierRegexString is a valid Regex.", () => {
        expect(() => new RegExp(info.identifierRegexString, "u")).not.toThrow();
    });
    // TODO: Test that identifierRegexString validates identifiers correctly.

    test("casings is populated", () => {
        expect(typeof info.casings).toStrictEqual("object");
        expect(Array.isArray(info.casings)).toStrictEqual(true);
        expect(info.casings.length).toBeGreaterThanOrEqual(1);
    });
});
