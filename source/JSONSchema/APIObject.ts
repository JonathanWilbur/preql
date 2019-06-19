import identifierRegexString from '../identifierRegex';
import APIObjectMetadataSchema from './APIObjectMetadata';

const APIObjectSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL API Object Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    apiVersion: {
      type: 'string',
      pattern: '^preql/(0|(?:[1-9]\\d*))\\.(0|(?:[1-9]\\d*))\\.(0|(?:[1-9]\\d*))$',
    },
    kind: {
      type: 'string',
      pattern: identifierRegexString,
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
