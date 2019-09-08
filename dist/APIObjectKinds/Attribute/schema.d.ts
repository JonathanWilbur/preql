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
        pluralName: {
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
            unicodePattern: string;
        };
        length: {
            type: string;
            minimum: number;
        };
        multiValued: {
            type: string;
            default: boolean;
        };
        characterSet: {
            type: string;
            pattern: string;
        };
        collation: {
            type: string;
            pattern: string;
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
        matchingRules: {
            type: string;
            items: {
                type: string;
                pattern: string;
            };
        };
        orderingRules: {
            type: string;
            items: {
                type: string;
                pattern: string;
            };
        };
        substringRules: {
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