/**
 * This kind exists because different DBMSs have different names for the same
 * character sets. This kind maps an arbitrarily-named character set to its
 * real equivalents in the targeted DBMS language.
 */
declare const schema: {
    $schema: string;
    $async: boolean;
    title: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        name: {
            type: string;
            pattern: string;
        };
        targetEquivalents: {
            type: string;
            description: string;
            additionalProperties: {
                type: string;
            };
        };
        country: {
            type: string;
            enum: string[];
        };
        language: {
            type: string;
            enum: string[];
        };
        caseSensitive: {
            type: string;
        };
        accentSensitive: {
            type: string;
        };
        kanaSensitive: {
            type: string;
        };
        widthSensitive: {
            type: string;
        };
        variationSelectorSensitive: {
            type: string;
        };
        binary: {
            type: string;
        };
        characterSet: {
            type: string;
        };
    };
    required: string[];
};
export default schema;
//# sourceMappingURL=schema.d.ts.map