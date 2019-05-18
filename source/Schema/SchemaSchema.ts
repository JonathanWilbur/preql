import TableSchema from './TableSchema';

const SchemaSchema = {
  title: 'PreQL Schema Schema',
  type: 'object',
  properties: {
    // functions
    tables: {
      type: 'object',
      additionalProperties: TableSchema,
    },
    // views
  },
  required: [],
};

export default SchemaSchema;
