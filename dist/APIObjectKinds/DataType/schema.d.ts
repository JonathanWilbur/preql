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
        setters: {
            type: string;
            items: {
                anyOf: ({
                    type: string;
                    properties: {
                        type: {
                            type: string;
                            enum: string[];
                        };
                        side: {
                            type: string;
                            enum: string[];
                            default: string;
                        };
                        fromIndex?: undefined;
                        toIndex?: undefined;
                        from?: undefined;
                        to?: undefined;
                        casing?: undefined;
                        padLength?: undefined;
                        padString?: undefined;
                    };
                    required: string[];
                } | {
                    type: string;
                    properties: {
                        type: {
                            type: string;
                            enum: string[];
                        };
                        fromIndex: {
                            type: string;
                            minimum: number;
                        };
                        toIndex: {
                            type: string;
                            minimum: number;
                        };
                        side?: undefined;
                        from?: undefined;
                        to?: undefined;
                        casing?: undefined;
                        padLength?: undefined;
                        padString?: undefined;
                    };
                    required: string[];
                } | {
                    type: string;
                    properties: {
                        type: {
                            type: string;
                            enum: string[];
                        };
                        from: {
                            type: string;
                        };
                        to: {
                            type: string;
                        };
                        side?: undefined;
                        fromIndex?: undefined;
                        toIndex?: undefined;
                        casing?: undefined;
                        padLength?: undefined;
                        padString?: undefined;
                    };
                    required: string[];
                } | {
                    type: string;
                    properties: {
                        type: {
                            type: string;
                            enum: string[];
                        };
                        casing: {
                            type: string;
                            enum: string[];
                        };
                        side?: undefined;
                        fromIndex?: undefined;
                        toIndex?: undefined;
                        from?: undefined;
                        to?: undefined;
                        padLength?: undefined;
                        padString?: undefined;
                    };
                    required: string[];
                } | {
                    type: string;
                    properties: {
                        type: {
                            type: string;
                            enum: string[];
                        };
                        side: {
                            type: string;
                            enum: string[];
                            default?: undefined;
                        };
                        padLength: {
                            type: string;
                            minimum: number;
                        };
                        padString: {
                            type: string;
                            minLength: number;
                        };
                        fromIndex?: undefined;
                        toIndex?: undefined;
                        from?: undefined;
                        to?: undefined;
                        casing?: undefined;
                    };
                    required: string[];
                } | {
                    type: string;
                    properties: {
                        type: {
                            type: string;
                            enum: string[];
                        };
                        side?: undefined;
                        fromIndex?: undefined;
                        toIndex?: undefined;
                        from?: undefined;
                        to?: undefined;
                        casing?: undefined;
                        padLength?: undefined;
                        padString?: undefined;
                    };
                    required: string[];
                })[];
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
                };
            };
        };
    };
    required: string[];
};
export default schema;
