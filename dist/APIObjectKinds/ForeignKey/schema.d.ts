declare const schema: {
    $schema: string;
    $async: boolean;
    title: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        databaseName: {
            type: string;
            pattern: string;
        };
        parentStruct: {
            type: string;
            pattern: string;
        };
        childStruct: {
            type: string;
            pattern: string;
        };
        attributeName: {
            type: string;
            pattern: string;
        };
        onDeleteAction: {
            type: string;
            enum: string[];
            default: string;
        };
        onUpdateAction: {
            type: string;
            enum: string[];
            default: string;
        };
    };
    required: string[];
};
export default schema;
