const keyReference = {
  type: 'object',
  properties: {
    struct: {
      type: 'string',
    },
    key: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          columnName: {
            type: 'string',
          },
        },
      },
      required: [
        'columnName',
      ],
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
    },
    databaseName: {
      type: 'string',
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
