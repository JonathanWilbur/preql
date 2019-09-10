/**
 * The JSON schema for the `spec` section of a PreQL `Struct`.
 *
 * @see /source/APIObjectKinds/Struct/kind.
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
        pluralName: {
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
        characterSet: {
            type: string;
            pattern: string;
        };
        collation: {
            type: string;
            pattern: string;
        };
        objectIdentifier: {
            type: string;
            pattern: string;
        };
    };
    required: string[];
};
export default schema;
//# sourceMappingURL=schema.d.ts.map