const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'PreQL Data Policy Specification Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    selector: {
      type: 'object',
      properties: {
        matchLabels: {
          type: 'object',
          additionalProperties: {
            type: 'string',
          },
        },
      },
      required: [
        'matchLabels',
      ],
    },
    require: {
      type: 'object',
      properties: {
        queryLogs: {
          type: 'boolean',
        },
        slowQueryLogs: {
          type: 'boolean',
        },
        insertLogs: {
          type: 'boolean',
        },
        updateLogs: {
          type: 'boolean',
        },
        flag: {
          type: 'boolean',
        },
        nonExistence: {
          type: 'boolean',
        },
      },
    },
    nonComplianceActions: {
      type: 'object',
      properties: {
        displayWarning: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
            },
          },
          required: [
            'text',
          ],
        },
        addWarningEntry: {
          type: 'object',
          properties: {
            databaseName: {
              type: 'string',
            },
            structName: {
              type: 'string',
            },
            attributeName: {
              type: 'string',
            },
          },
          required: [
            'structName',
          ],
        },
        ignore: {
          type: 'boolean',
        },
        nullify: {
          type: 'boolean',
        },
        dropIfEmpty: {
          type: 'boolean',
        },
      },
    },
  },
  required: [
    'selector',
    'require',
    'nonComplianceActions',
  ],
};

export default schema;
