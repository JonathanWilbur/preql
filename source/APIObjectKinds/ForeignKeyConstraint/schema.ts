import identifierRegexString from '../../identifierRegex';

const keyReference = {
  type: 'object',
  properties: {
    struct: {
      type: 'string',
      pattern: identifierRegexString,
    },
    key: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          attributeName: {
            type: 'string',
            pattern: identifierRegexString,
          },
        },
        required: [
          'attributeName',
        ],
      },
    },
  },
  required: [
    'struct',
    'key',
  ],
};

const foreignKeyChangeAction = {
  type: 'string',
  enum: [
    'no action',
    'cascade',
    'set null',
  ],
  default: 'no action',
};

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL Foreign Key Constraint Specification Schema',
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
    child: keyReference,
    parent: keyReference,
    onDeleteAction: foreignKeyChangeAction,
    onUpdateAction: foreignKeyChangeAction,
  },
  required: [
    'name',
    'databaseName',
    'child',
    'parent',
  ],
};

export default schema;
