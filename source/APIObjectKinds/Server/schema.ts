import identifierRegexString from '../../identifierRegex';

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL Server Specification Schema',
  description: 'This is not really used for anything.',
  type: 'object',
  additionalProperties: false,
  properties: {
    protocol: {
      // RFC 3987: scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
      type: 'string',
      pattern: '^[A-Za-z][A-Za-z0-9\\+\\-\\.]*$',
    },
    hostname: {
      type: 'string',
      unicodePattern: '^(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.)*(?:(\\p{L}|\\p{N})(?:(\\p{L}|\\p{N}|-){0,61}(\\p{L}|\\p{N}))?\\.?)$',
      maxLength: 253,
    },
    port: {
      type: 'number',
      minimum: 0,
      maximum: 65535,
    },
    defaultDatabase: {
      type: 'string',
      pattern: identifierRegexString,
    },
    tlsSupported: {
      type: 'boolean',
    },
    starttlsSupported: {
      type: 'boolean',
    },
    options: {
      type: 'object',
      properties: {
        timezone: {
          type: ['number', 'string'],
          description: 'If this is a string, it should be a TZ Database timezone name. If it is a number, it should be a UTC offset.',
          minimum: -12,
          maximum: 14,
        },
      },
      additionalProperties: {
        type: 'string',
      },
    },
  },
  required: [
    'hostname',
    'protocol',
  ],
};

export default schema;
