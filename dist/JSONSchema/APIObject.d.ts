declare const APIObjectSchema: {
    $schema: string;
    $async: boolean;
    title: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        apiVersion: {
            type: string;
            pattern: string;
        };
        kind: {
            type: string;
            pattern: string;
        };
        metadata: {
            $schema: string;
            $async: boolean;
            title: string;
            type: string;
            additionalProperties: boolean;
            properties: {
                annotations: {
                    type: string;
                    propertyNames: {
                        unicodePattern: string;
                        minLength: number;
                        maxLength: number;
                    };
                    additionalProperties: {
                        type: string;
                    };
                    default: {};
                };
                labels: {
                    type: string;
                    propertyNames: {
                        unicodePattern: string;
                        minLength: number;
                        maxLength: number;
                    };
                    additionalProperties: {
                        type: string;
                    };
                    default: {};
                };
                name: {
                    type: string;
                    unicodePattern: string;
                    minLength: number;
                    maxLength: number;
                };
                namespace: {
                    type: string;
                    default: string;
                    unicodePattern: string;
                    minLength: number;
                    maxLength: number;
                };
            };
            required: string[];
        };
        spec: {
            type: string;
            additionalProperties: {};
        };
    };
    required: string[];
};
export default APIObjectSchema;
//# sourceMappingURL=APIObject.d.ts.map