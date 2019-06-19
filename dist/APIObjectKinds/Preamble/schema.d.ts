declare const schema: {
    $schema: string;
    $async: boolean;
    title: string;
    description: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        uncommentedText: {
            type: string;
        };
    };
    required: string[];
};
export default schema;
