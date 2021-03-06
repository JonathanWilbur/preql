/**
 * The JSON schema for the `spec` section of a PreQL `Postamble`.
 *
 * @see /source/APIObjectKinds/Postamble/kind.
 */
declare const schema: {
    $schema: string;
    $async: boolean;
    title: string;
    description: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        uncommentedText: {
            type: string;
        };
    };
    required: string[];
};
export default schema;
//# sourceMappingURL=schema.d.ts.map