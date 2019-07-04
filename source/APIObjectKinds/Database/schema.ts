import identifierRegexString from '../../identifierRegex';

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL Database Specification Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      pattern: identifierRegexString,
    },
    characterSet: {
      type: 'string',
      pattern: identifierRegexString,
    },
    collation: {
      type: 'string',
      pattern: identifierRegexString,
    },
    serverName: {
      type: 'string',
      unicodePattern: '^(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.)*(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.?)$',
    },
  },
  required: [
    'name',
  ],
};

export default schema;
