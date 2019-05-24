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
    ensureTheseThingsArePresent: {
      type: 'array',
      items: APIObject,
    },
    ensureTheseThingsAreAbsent: {
      type: 'array',
      items: APIObject,
    },
  },
  required: [
    'transpileTo',
    'ensureTheseThingsArePresent',
    'ensureTheseThingsAreAbsent',
  ],
};

export default HandlerEventSchema;
