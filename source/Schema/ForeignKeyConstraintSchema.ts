const ForeignKeyConstraintSchema = {
  title: 'PreQL Foreign Key Constraint Schema',
  type: 'object',
  properties: {
    comment: {
      // I don't actually know if this is supported by anything.
      type: 'string',
    },
    columns: {
      type: 'array',
      items: {
        type: 'string',
      },
      minItems: 1,
      uniqueItems: true,
    },
    onDelete: {
      type: 'string',
      enum: [
        'restrict',
        'cascade',
        'nullify',
      ],
    },
    // TODO: Support this: (RESTRICT, CASCADE, SET NULL)
    onUpdate: {
      type: 'string',
    },
    referenceTable: {
      type: 'string',
    },
    referenceColumns: {
      type: 'array',
      items: {
        type: 'string',
      },
      minItems: 1,
      uniqueItems: true,
    },
  },
  required: [
    'columns',
    // TODO: Make referenceTable default to the current table.
    'referenceTable',
    'referenceColumns',
  ],
};

export default ForeignKeyConstraintSchema;
