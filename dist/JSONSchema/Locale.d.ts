/**
 * The JSON schema for a locale.
 */
declare const Locale: {
    $schema: string;
    $async: boolean;
    title: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        country: {
            type: string;
            enum: string[];
        };
        language: {
            type: string;
            enum: string[];
        };
    };
    required: string[];
};
export default Locale;
//# sourceMappingURL=Locale.d.ts.map