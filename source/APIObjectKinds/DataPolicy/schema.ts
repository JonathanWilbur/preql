const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL Data Policy Specification Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    selector: {
      type: 'object',
      properties: {
        matchLabels: {
          type: 'object',
          // TODO: propertyNames
          additionalProperties: {
            type: 'string',
            // TODO: pattern
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
    nonComplianceAction: {
      type: 'string',
      enum: [
        'warn',
        'ignore',
      ],
    },
  },
  required: [
    'selector',
    'require',
    'nonComplianceAction',
  ],
};

export default schema;
