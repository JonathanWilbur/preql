import identifierRegexString from '../../identifierRegexString';

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL Entry Specification Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    databaseName: {
      type: 'string',
      pattern: identifierRegexString,
    },
    structName: {
      type: 'string',
      pattern: identifierRegexString,
    },
    distinguishedName: {
      type: 'string',
      // TODO: Obviously, more validation is needed than this.
      unicodePattern: '^[^#].*=.+',
    },
    values: {
      type: 'object',
      propertyNames: {
        pattern: identifierRegexString,
      },
      additionalProperties: {
        type: [
          'boolean',
          'number',
          'string',
        ],
      },
    },
  },
  required: [
    'databaseName',
    'structName',
  ],
};

export default schema;
