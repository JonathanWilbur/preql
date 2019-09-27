/**
 * The JSON schema for the `spec` section of a PreQL `Server`.
 *
 * @see /source/APIObjectKinds/Server/kind.
 */
declare const schema: {
    $schema: string;
    $async: boolean;
    title: string;
    description: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        name: {
            type: string;
        };
        protocol: {
            type: string;
            pattern: string;
        };
        hostname: {
            type: string;
            unicodePattern: string;
            maxLength: number;
        };
        port: {
            type: string;
            minimum: number;
            maximum: number;
        };
        tlsSupported: {
            type: string;
        };
        starttlsSupported: {
            type: string;
        };
        characterSet: {
            type: string;
        };
        collation: {
            type: string;
        };
        timezone: {
            type: string;
            enum: string[];
        };
        locale: {
            type: string;
            properties: {
                dateAndTimeFormat: {
                    $schema: string;
                    $async: boolean;
                    title: string;
                    description: string;
                    type: string;
                    additionalProperties: boolean;
                    properties: {
                        country: {
                            title: string;
                            description: string;
                            type: string;
                            enum: string[];
                        };
                        language: {
                            title: string;
                            description: string;
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                };
                language: {
                    $schema: string;
                    $async: boolean;
                    title: string;
                    description: string;
                    type: string;
                    additionalProperties: boolean;
                    properties: {
                        country: {
                            title: string;
                            description: string;
                            type: string;
                            enum: string[];
                        };
                        language: {
                            title: string;
                            description: string;
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                };
                monetaryFormat: {
                    $schema: string;
                    $async: boolean;
                    title: string;
                    description: string;
                    type: string;
                    additionalProperties: boolean;
                    properties: {
                        country: {
                            title: string;
                            description: string;
                            type: string;
                            enum: string[];
                        };
                        language: {
                            title: string;
                            description: string;
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                };
                numberFormat: {
                    $schema: string;
                    $async: boolean;
                    title: string;
                    description: string;
                    type: string;
                    additionalProperties: boolean;
                    properties: {
                        country: {
                            title: string;
                            description: string;
                            type: string;
                            enum: string[];
                        };
                        language: {
                            title: string;
                            description: string;
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                };
            };
            required: never[];
        };
        options: {
            type: string;
            additionalProperties: {
                type: string;
            };
        };
    };
    required: string[];
};
export default schema;
//# sourceMappingURL=schema.d.ts.map