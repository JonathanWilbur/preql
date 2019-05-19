import ColumnSchema from './ColumnSchema';
import IndexSchema from './IndexSchema';
import ForeignKeyConstraintSchema from './ForeignKeyConstraintSchema';

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
    foreignkeys: {
      type: 'object',
      additionalProperties: ForeignKeyConstraintSchema,
    },
    // It may be possible to use references for this, but then you run into
    // issues with parsing including, but not limited to, infinite recursion.
    implements: {
      type: 'array',
      items: {
        type: 'string',
      },
      minItems: 1,
      uniqueItems: true,
    },
    indexes: {
      type: 'object',
      additionalProperties: IndexSchema,
    },
  },
  required: [
    'columns',
  ],
};

export default TableSchema;
