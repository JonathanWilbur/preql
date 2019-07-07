export default function getPreqlInfo(): {
    version: string;
    majorVersion: number;
    minorVersion: number;
    patchVersion: number;
    kinds: string[];
    timezones: string[];
    iso639LanguageCodes: string[];
    iso3166CountryCodes: string[];
    prohibitedIdentifiers: string[];
    objectIdentifierRegexString: string;
    identifierRegexString: string;
    jsonTypes: string[];
    casings: string[];
    supportedSetters: string[];
    ajvOptions: {
        useDefaults: boolean;
    };
};