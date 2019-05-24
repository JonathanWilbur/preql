import APIObjectMetadataSchema from './APIObjectMetadata';

const APIObjectSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'PreQL API Object Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    apiVersion: {
      type: 'string',
    },
    kind: {
      type: 'string',
      // TODO: Make this an enum
    },
    metadata: APIObjectMetadataSchema,
    spec: {
      type: 'object',
      additionalProperties: {},
    },
  },
  required: [
    'apiVersion',
    'kind',
    'metadata',
    'spec',
  ],
};

export default APIObjectSchema;
