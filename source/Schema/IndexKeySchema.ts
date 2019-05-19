// NOTE: The order of index keys matter, so using column names as properties is a no-go.
const IndexKeySchema = {
  title: 'PreQL Index Key Schema',
  type: 'object',
  properties: {
    column: {
      type: 'string',
    },
    // references: {
    //   type: 'object',
    //   properties: {
    //     column: {
    //       type: 'string',
    //     },
    //     table: {
    //       type: 'string',
    //     },
    //   },
    //   required: [
    //     'column',
    //     'table',
    //   ],
    // },
    ascending: {
      type: 'boolean',
      default: true,
    },
  },
  required: [
    'column',
  ],
};

export default IndexKeySchema;
