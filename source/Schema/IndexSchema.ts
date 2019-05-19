import IndexKeySchema from './IndexKeySchema';

const IndexSchema = {
  title: 'PreQL Index Schema',
  type: 'object',
  additionalProperties: true,
  properties: {
    comment: {
      type: 'string',
    },
    keys: {
      type: 'array',
      items: IndexKeySchema,
      minItems: 1,
      uniqueItems: true,
    },
    type: {
      type: 'string',
      enum: [
        'plain',
        'primary',
        'unique',
        'text',
        'spatial',
      ],
    },
  },
  required: [
    'keys',
    'type',
  ],
};

export default IndexSchema;
