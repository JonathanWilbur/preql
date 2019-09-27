/**
 * The root JSON schema for all APIObjects.
 */
declare const APIObjectSchema: {
    $schema: string;
    $async: boolean;
    title: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        apiVersion: {
            title: string;
            description: string;
            type: string;
            pattern: string;
        };
        kind: {
            title: string;
            description: string;
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
                    title: string;
                    description: string;
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
                    title: string;
                    description: string;
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
                    title: string;
                    description: string;
                    type: string;
                    unicodePattern: string;
                    minLength: number;
                    maxLength: number;
                };
                namespace: {
                    title: string;
                    description: string;
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
            title: string;
            description: string;
            type: string;
            additionalProperties: {};
        };
    };
    required: string[];
};
export default APIObjectSchema;
//# sourceMappingURL=APIObject.d.ts.map