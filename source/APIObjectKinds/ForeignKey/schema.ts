import identifierRegexString from '../../identifierRegex';

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
  title: 'PreQL Foreign Key Specification Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    databaseName: {
      type: 'string',
      pattern: identifierRegexString,
    },
    parentStruct: {
      type: 'string',
      pattern: identifierRegexString,
    },
    childStruct: {
      type: 'string',
      pattern: identifierRegexString,
    },
    attributeName: {
      type: 'string',
      pattern: identifierRegexString,
    },
    nullable: {
      type: 'boolean',
      default: true,
    },
    onDeleteAction: foreignKeyChangeAction,
    onUpdateAction: foreignKeyChangeAction,
  },
  required: [
    'databaseName',
    'parentStruct',
    'childStruct',
    'attributeName',
  ],
};

export default schema;
