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
        defaultCollation: {
            type: string;
            pattern: string;
        };
        maximumCharacterLength: {
            type: string;
            minimum: number;
        };
    };
    required: string[];
};
export default schema;
