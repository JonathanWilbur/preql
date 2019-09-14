/**
 * The JSON schema for the `spec` section of a PreQL `PlainIndex`.
 *
 * @see /source/APIObjectKinds/PlainIndex/kind.
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
        structName: {
            type: string;
            pattern: string;
        };
        entityName: {
            type: string;
            pattern: string;
        };
        databaseName: {
            type: string;
            pattern: string;
        };
        clustered: {
            type: string;
            default: boolean;
        };
        sparse: {
            type: string;
            default: boolean;
        };
        keyAttributes: {
            type: string;
            items: {
                type: string;
                properties: {
                    name: {
                        type: string;
                        pattern: string;
                    };
                    ascending: {
                        type: string;
                        default: boolean;
                    };
                };
                required: string[];
            };
        };
        includedAttributes: {
            type: string;
            items: {
                type: string;
                properties: {
                    name: {
                        type: string;
                        pattern: string;
                    };
                    ascending: {
                        type: string;
                        default: boolean;
                    };
                };
                required: string[];
            };
        };
    };
    required: string[];
};
export default schema;
//# sourceMappingURL=schema.d.ts.map