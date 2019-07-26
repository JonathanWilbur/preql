declare const schema: {
    $schema: string;
    $async: boolean;
    title: string;
    oneOf: ({
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
                        nativeType: {
                            type: string;
                        };
                    };
                    required: string[];
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
                type: string;
                enum: string[];
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
                        nativeType: {
                            type: string;
                        };
                    };
                    required: string[];
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
};
export default schema;
