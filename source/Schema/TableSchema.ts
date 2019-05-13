import ColumnSchema from './ColumnSchema';
import IndexSchema from './IndexSchema';

const TableSchema = {
  title: 'PreQL Table Schema',
  type: 'object',
  additionalProperties: true,
  properties: {
    columns: {
      type: 'object',
      additionalProperties: ColumnSchema,
    },
    comment: {
      type: 'string',
    },
    // It may be possible to use references for this, but then you run into
    // issues with parsing including, but not limited to, infinite recursion.
    implements: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    indexes: {
      type: 'object',
      additionalProperties: IndexSchema,
    },
  },
  required: [],
};

export default TableSchema;
