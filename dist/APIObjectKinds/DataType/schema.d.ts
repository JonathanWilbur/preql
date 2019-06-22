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
            properties: {
                trim: {
                    type: string;
                    properties: {
                        side: {
                            type: string;
                            enum: string[];
                            default: string;
                        };
                    };
                };
                substring: {
                    type: string;
                    properties: {
                        fromIndex: {
                            type: string;
                            minimum: number;
                        };
                        toIndex: {
                            type: string;
                            minimum: number;
                        };
                        reverse: {
                            type: string;
                            default: boolean;
                        };
                    };
                };
                replace: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                case: {
                    type: string;
                    properties: {
                        casing: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string;
                };
                pad: {
                    type: string;
                    properties: {
                        side: {
                            type: string;
                            enum: string[];
                        };
                        padString: {
                            type: string;
                            minLength: number;
                        };
                    };
                };
            };
            now: {
                type: string;
                properties: {};
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
