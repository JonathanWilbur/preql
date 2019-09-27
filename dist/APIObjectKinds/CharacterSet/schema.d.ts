/**
 * The JSON schema for the `spec` section of a PreQL `CharacterSet`.
 *
 * @see /source/APIObjectKinds/CharacterSet/kind.
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
//# sourceMappingURL=schema.d.ts.map