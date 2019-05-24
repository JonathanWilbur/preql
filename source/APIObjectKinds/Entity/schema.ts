const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'PreQL Entity Specification Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    rootStruct: {
      type: 'string',
    },
  },
  required: [
    'rootStruct',
  ],
};

export default schema;
