import identifierRegexString from '../../identifierRegexString';
import objectIdentifierRegexString from '../../objectIdentifierRegexString';

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL Enum Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      pattern: identifierRegexString,
    },
    databaseName: {
      type: 'string',
      pattern: identifierRegexString,
    },
    type: {
      type: 'string',
      pattern: identifierRegexString,
    },
    length: {
      type: 'integer',
      minimum: 1,
    },
    objectIdentifier: {
      type: 'string',
      pattern: objectIdentifierRegexString,
    },
    characterSet: {
      type: 'string',
      pattern: identifierRegexString,
    },
    collation: {
      type: 'string',
      pattern: identifierRegexString,
    },
    values: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          value: {
            type: 'string',
            minLength: 1,
          },
          index: {
            number: 'string',
            minimum: 0,
          },
        },
        required: [
          'value',
        ],
      },
      minItems: 1,
      maxItems: 255,
      uniqueItems: true,
    },
  },
  required: [
    'name',
    // 'entityName',
    'databaseName',
    'type',
    'values',
  ],
};

export default schema;
