/**
 * The JSON schema for the metadata section of all APIObjects. Based on the
 * Kubernetes API object metadata.
 * @see https://github.com/garethr/kubernetes-json-schema/blob/master/v1.9.9/objectmeta.json
 */
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