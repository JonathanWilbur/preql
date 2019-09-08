declare const APIObjectMetadataSchema: {
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
export default APIObjectMetadataSchema;
//# sourceMappingURL=APIObjectMetadata.d.ts.map