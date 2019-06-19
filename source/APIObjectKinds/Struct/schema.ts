import identifierRegexString from '../../identifierRegex';

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL Struct Specification Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {
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
  },
  required: [
    'name',
    // 'entityName',
    'databaseName',
  ],
};

export default schema;
