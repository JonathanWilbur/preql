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
        keyColumns: {
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
        includedColumns: {
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
