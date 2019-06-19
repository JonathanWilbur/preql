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
        child: {
            type: string;
            properties: {
                struct: {
                    type: string;
                    pattern: string;
                };
                key: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            attributeName: {
                                type: string;
                                pattern: string;
                            };
                        };
                        required: string[];
                    };
                };
            };
            required: string[];
        };
        parent: {
            type: string;
            properties: {
                struct: {
                    type: string;
                    pattern: string;
                };
                key: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            attributeName: {
                                type: string;
                                pattern: string;
                            };
                        };
                        required: string[];
                    };
                };
            };
            required: string[];
        };
        onDeleteAction: {
            type: string;
            enum: string[];
            default: string;
        };
        onUpdateAction: {
            type: string;
            enum: string[];
            default: string;
        };
    };
    required: string[];
};
export default schema;
