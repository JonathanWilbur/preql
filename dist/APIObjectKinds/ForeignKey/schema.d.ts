/**
 * The JSON schema for the `spec` section of a PreQL `ForeignKey`.
 *
 * @see /source/APIObjectKinds/ForeignKey/kind.
 */
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
        parentStructName: {
            type: string;
            pattern: string;
        };
        childStructName: {
            type: string;
            pattern: string;
        };
        name: {
            type: string;
            pattern: string;
        };
        nullable: {
            type: string;
            default: boolean;
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
        objectIdentifier: {
            type: string;
            pattern: string;
        };
        otherNames: {
            type: string;
            items: {
                type: string;
                pattern: string;
            };
        };
    };
    required: string[];
};
export default schema;
//# sourceMappingURL=schema.d.ts.map