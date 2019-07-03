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
        defaultDatabase: {
            type: string;
            pattern: string;
        };
        tlsSupported: {
            type: string;
        };
        starttlsSupported: {
            type: string;
        };
        options: {
            type: string;
            properties: {
                characterSet: {
                    type: string;
                };
                collation: {
                    type: string;
                };
                locale: {
                    type: string;
                    pattern: string;
                };
                timezone: {
                    type: string[];
                    description: string;
                    minimum: number;
                    maximum: number;
                };
            };
            additionalProperties: {
                type: string;
            };
        };
    };
    required: string[];
};
export default schema;
