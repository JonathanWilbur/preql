/**
 * The JSON schema for the `spec` section of a PreQL `Entity`.
 *
 * @see /source/APIObjectKinds/Entity/kind.
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
        databaseName: {
            type: string;
            pattern: string;
        };
        rootStruct: {
            type: string;
            pattern: string;
        };
    };
    required: string[];
};
export default schema;
//# sourceMappingURL=schema.d.ts.map