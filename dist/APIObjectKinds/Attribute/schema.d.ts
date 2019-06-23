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
        structName: {
            type: string;
            pattern: string;
        };
        entityName: {
            type: string;
            pattern: string;
        };
        databaseName: {
            type: string;
            pattern: string;
        };
        default: {
            type: string[];
        };
        nullable: {
            type: string;
            default: boolean;
        };
        type: {
            type: string;
            pattern: string;
        };
        length: {
            type: string;
            minimum: number;
        };
        multiValued: {
            type: string;
            default: boolean;
        };
    };
    required: string[];
};
export default schema;