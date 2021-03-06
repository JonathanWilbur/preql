/**
 * The JSON schema for the `spec` section of a PreQL `Database`.
 *
 * @see /source/APIObjectKinds/Database/kind.
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
        characterSet: {
            type: string;
            pattern: string;
        };
        collation: {
            type: string;
            pattern: string;
        };
        serverName: {
            type: string;
            unicodePattern: string;
        };
        maximumSizeInBytes: {
            type: string;
            minimum: number;
        };
    };
    required: string[];
};
export default schema;
//# sourceMappingURL=schema.d.ts.map