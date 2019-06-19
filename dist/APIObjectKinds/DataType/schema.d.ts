declare const schema: {
    $schema: string;
    $async: boolean;
    title: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        jsonEquivalent: {
            type: string;
            enum: string[];
        };
        lengthUnits: {
            type: string;
            description: string;
        };
        minimum: {
            type: string;
        };
        maximum: {
            type: string;
        };
        regexes: {
            type: string;
            description: string;
            propertyNames: {
                pattern: string;
                minLength: number;
                maxLength: number;
            };
            additionalProperties: {
                type: string;
                description: string;
                additionalProperties: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            pattern: {
                                type: string;
                            };
                            positive: {
                                type: string;
                                default: boolean;
                            };
                        };
                        required: string[];
                    };
                };
            };
        };
        targets: {
            type: string;
            additionalProperties: {
                type: string;
                properties: {
                    return: {
                        type: string;
                    };
                    returnBasedOnLength: {
                        type: string;
                        propertyNames: {
                            pattern: string;
                        };
                        additionalProperties: {
                            type: string;
                        };
                    };
                    check: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                    setters: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                };
            };
        };
    };
    required: string[];
};
export default schema;
