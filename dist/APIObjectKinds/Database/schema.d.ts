declare const schema: {
    $schema: string;
    $async: boolean;
    title: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        name: {
            type: string;
            pattern: string;
        };
        collation: {
            type: string;
            default: string;
            description: string;
        };
        characterSet: {
            type: string;
        };
        serverName: {
            type: string;
        };
    };
    required: string[];
};
export default schema;
