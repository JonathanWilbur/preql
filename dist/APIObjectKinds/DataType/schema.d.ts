declare const schema: {
    $schema: string;
    $async: boolean;
    title: string;
    allOf: ({
        type: string;
        properties: {
            jsonEquivalent: {
                type: string;
                enum: string[];
            };
            syntaxObjectIdentifiers: {
                type: string;
                description: string;
                items: {
                    type: string;
                    pattern: string;
                };
            };
            lengthUnits: {
                type: string;
                description: string;
            };
        };
        /**
         * I don't think you can use oneOf here, because booleanSchema will match
         * almost anything. I also think the ordering might matter. We want the
         * stricter schema to be evaluated first.
         */
        anyOf?: undefined;
    } | {
        /**
         * I don't think you can use oneOf here, because booleanSchema will match
         * almost anything. I also think the ordering might matter. We want the
         * stricter schema to be evaluated first.
         */
        anyOf: ({
            $schema: string;
            $async: boolean;
            title: string;
            type: string;
            additionalProperties: boolean;
            properties: {
                jsonEquivalent: {
                    const: string;
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
        } | {
            $schema: string;
            $async: boolean;
            title: string;
            type: string;
            additionalProperties: boolean;
            properties: {
                jsonEquivalent: {
                    oneOf: {
                        const: string;
                    }[];
                };
                minimum: {
                    type: string;
                };
                maximum: {
                    type: string;
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
        } | {
            $schema: string;
            $async: boolean;
            title: string;
            type: string;
            additionalProperties: boolean;
            properties: {
                jsonEquivalent: {
                    const: string;
                };
                name: {
                    type: string;
                    pattern: string;
                };
                values: {
                    type: string;
                    items: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                };
            };
            required: string[];
        })[];
        type?: undefined;
        properties?: undefined;
    })[];
};
export default schema;
