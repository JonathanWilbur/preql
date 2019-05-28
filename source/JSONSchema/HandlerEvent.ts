import APIObject from './APIObject';

const HandlerEventSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'PreQL Handler Event Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    transpileTo: {
      type: 'string',
    },
    objects: {
      type: 'array',
      items: APIObject,
    },
  },
  required: [
    'transpileTo',
    'objects',
  ],
};

export default HandlerEventSchema;
