import objectIdentifierRegexString from '../../objectIdentifierRegexString';

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL Data Type Specification Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    jsonEquivalent: {
      type: 'string',
      enum: [
        'boolean',
        'integer',
        'number',
        'string',
        'array',
        // 'object',
      ],
    },
    syntaxObjectIdentifiers: {
      type: 'array',
      description:
       'These should be arranged in order of descending preference. An array '
       + 'of object identifiers is used instead of a single object identifier '
       + 'because it cannot be guaranteed that every LDAP directory will '
       + 'support the same syntaxes. Allowing multiple "backup" object '
       + 'identifiers makes it less likely that a suitable syntax will not be '
       + 'found.',
      items: {
        type: 'string',
        pattern: objectIdentifierRegexString,
      },
    },
    lengthUnits: {
      type: 'string',
      description: 'A purely informational field.',
    },
    minimum: {
      type: 'number',
    },
    maximum: {
      type: 'number',
    },
    regexes: {
      type: 'object',
      description: 'A map of regex kinds.',
      propertyNames: {
        pattern: '^[A-Za-z0-9]+$',
        minLength: 1,
        maxLength: 32,
      },
      additionalProperties: {
        type: 'object',
        description: 'A map of match groups. If all regexes under one match group match the value, the value matches.',
        additionalProperties: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              pattern: {
                type: 'string',
              },
              positive: {
                type: 'boolean',
                default: true,
              },
            },
            required: [
              'pattern',
            ],
          },
        },
      },
    },
    setters: {
      type: 'array',
      items: {
        anyOf: [

          // trim
          {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['trim'],
              },
              side: {
                type: 'string',
                enum: [
                  'left',
                  'right',
                  'both',
                ],
                default: 'both',
              },
            },
            required: [
              'type',
            ],
          },

          // substring
          {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['substring'],
              },
              fromIndex: {
                type: 'number',
                minimum: 0,
              },
              toIndex: {
                type: 'number',
                minimum: 1,
              },
            },
            required: [
              'type',
              'fromIndex',
            ],
          },

          // replace
          {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['replace'],
              },
              from: {
                type: 'string',
              },
              to: {
                type: 'string',
              },
            },
            required: [
              'type',
              'from',
              'to',
            ],
          },

          // case
          {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['case'],
              },
              casing: {
                type: 'string',
                enum: [
                  'upper',
                  'lower',
                  'title',
                  'sentence',
                ],
              },
            },
            required: [
              'type',
              'casing',
            ],
          },

          // pad
          {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['pad'],
              },
              side: {
                type: 'string',
                enum: [
                  'left',
                  'right',
                ],
              },
              padLength: {
                type: 'number',
                minimum: 1,
              },
              padString: {
                type: 'string',
                minLength: 1,
              },
            },
            required: [
              'type',
              'side',
              'padLength',
              'padString',
            ],
          },

          // now
          {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['now'],
              },
            },
            required: [
              'type',
            ],
          },

        ],
      },
    },
    targets: {
      type: 'object',
      additionalProperties: {
        type: 'object',
        properties: {
          return: {
            type: 'string',
          },
          returnBasedOnLength: {
            type: 'object',
            propertyNames: {
              pattern: '^[1-9]\\d+$',
            },
            additionalProperties: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  required: [
    'jsonEquivalent',
    'targets',
  ],
};

export default schema;
