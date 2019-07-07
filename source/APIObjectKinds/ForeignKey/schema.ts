import identifierRegexString from '../../identifierRegexString';

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
    parentStructName: {
      type: 'string',
      pattern: identifierRegexString,
    },
    childStructName: {
      type: 'string',
      pattern: identifierRegexString,
    },
    name: {
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
    'parentStructName',
    'childStructName',
    'name',
  ],
};

export default schema;
