import identifierRegexString from '../../identifierRegexString';

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL Text Index Specification Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      pattern: identifierRegexString,
    },
    structName: {
      type: 'string',
      pattern: identifierRegexString,
    },
    entityName: {
      type: 'string',
      pattern: identifierRegexString,
    },
    databaseName: {
      type: 'string',
      pattern: identifierRegexString,
    },
    // eslint-disable-next-line
    // See: https://docs.microsoft.com/en-us/sql/relational-databases/indexes/clustered-and-nonclustered-indexes-described?view=sql-server-2017
    clustered: {
      type: 'boolean',
      default: false,
    },
    // eslint-disable-next-line
    // See: https://docs.microsoft.com/en-us/sql/relational-databases/indexes/create-indexes-with-included-columns?view=sql-server-2017
    keyColumns: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            pattern: identifierRegexString,
          },
          ascending: {
            type: 'boolean',
            default: true,
          },
        },
        required: [
          'name',
        ],
      },
    },
    includedColumns: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            pattern: identifierRegexString,
          },
          ascending: {
            type: 'boolean',
            default: true,
          },
        },
        required: [
          'name',
        ],
      },
    },
  },
  required: [
    'keyColumns',
  ],
};

export default schema;
