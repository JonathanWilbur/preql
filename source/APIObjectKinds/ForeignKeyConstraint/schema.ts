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

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
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
  },
  required: [
    'name',
    'databaseName',
    'child',
    'parent',
  ],
};

export default schema;
