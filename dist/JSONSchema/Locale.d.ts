/**
 * The JSON schema for a locale.
 */
declare const Locale: {
    $schema: string;
    $async: boolean;
    title: string;
    description: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        country: {
            title: string;
            description: string;
            type: string;
            enum: string[];
        };
        language: {
            title: string;
            description: string;
            type: string;
            enum: string[];
        };
    };
    required: string[];
};
export default Locale;
//# sourceMappingURL=Locale.d.ts.map