declare const schema: {
    $schema: string;
    $async: boolean;
    title: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        databaseName: {
            type: string;
            pattern: string;
        };
        structName: {
            type: string;
            pattern: string;
        };
        id: {
            type: string;
            minimum: number;
        };
        distinguishedName: {
            type: string;
            unicodePattern: string;
        };
        values: {
            type: string;
            propertyNames: {
                pattern: string;
            };
            additionalProperties: {
                type: string[];
            };
        };
    };
    required: string[];
};
export default schema;
//# sourceMappingURL=schema.d.ts.map