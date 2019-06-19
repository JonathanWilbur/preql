declare const schema: {
    $schema: string;
    $async: boolean;
    title: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        selector: {
            type: string;
            properties: {
                matchLabels: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
            };
            required: string[];
        };
        require: {
            type: string;
            properties: {
                queryLogs: {
                    type: string;
                };
                slowQueryLogs: {
                    type: string;
                };
                insertLogs: {
                    type: string;
                };
                updateLogs: {
                    type: string;
                };
                flag: {
                    type: string;
                };
                nonExistence: {
                    type: string;
                };
            };
        };
        nonComplianceAction: {
            type: string;
            enum: string[];
        };
    };
    required: string[];
};
export default schema;
