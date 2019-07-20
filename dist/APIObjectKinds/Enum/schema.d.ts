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
        databaseName: {
            type: string;
            pattern: string;
        };
        type: {
            type: string;
            pattern: string;
        };
        length: {
            type: string;
            minimum: number;
        };
        objectIdentifier: {
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
        values: {
            type: string;
            items: {
                type: string;
                additionalProperties: boolean;
                properties: {
                    value: {
                        type: string;
                        minLength: number;
                    };
                    index: {
                        number: string;
                        minimum: number;
                    };
                };
                required: string[];
            };
            minItems: number;
            maxItems: number;
            uniqueItems: boolean;
        };
    };
    required: string[];
};
export default schema;
