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
    collation: {
      type: 'string',
      default: 'utf8',
      description:
        'Only lowercase alphabetic and numeric characters from the acronym'
        + '/ symbol of the character encoding.',
    },
    characterSet: {
      type: 'string',
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
