import identifierRegexString from '../../identifierRegexString';

const targetsMapSchema = {
  type: 'object',
  additionalProperties: {
    type: 'object',
    properties: {
      nativeType: {
        type: 'string',
      },
    },
    required: [
      'nativeType',
    ],
  },
};

const booleanSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL String Data Type Specification Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    jsonEquivalent: {
      const: 'boolean',
    },
    targets: targetsMapSchema,
  },
  required: [
    'jsonEquivalent',
    'targets',
  ],
};

const stringSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL String Data Type Specification Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    jsonEquivalent: {
      const: 'string',
    },
    targets: targetsMapSchema,
    minLength: {
      type: 'number',
      minimum: 0,
    },
    maxLength: {
      type: 'number',
      minimum: 1,
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
  },
  required: [
    'jsonEquivalent',
    'targets',
  ],
};

const numberSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL Number Data Type Specification Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    jsonEquivalent: {
      type: 'string',
      enum: [
        'number',
        'integer',
      ],
    },
    minimum: {
      type: 'number',
    },
    maximum: {
      type: 'number',
    },
    overflowBehavior: {
      type: 'string',
      enum: [
        'ZERO',
        'MIN',
        'MAX',
        'IGNORE',
        'ERROR',
      ],
    },
    underflowBehavior: {
      type: 'string',
      enum: [
        'ZERO',
        'MIN',
        'MAX',
        'IGNORE',
        'ERROR',
      ],
    },
    targets: targetsMapSchema,
  },
  required: [
    'jsonEquivalent',
    'targets',
  ],
};

const enumSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL Enum Data Type Specification Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    jsonEquivalent: {
      const: 'string',
    },
    name: {
      type: 'string',
      pattern: identifierRegexString,
    },
    values: {
      type: 'array',
      items: {
        type: 'string',
        minLength: 1,
        maxLength: 32,
      },
    },
  },
  required: [
    'jsonEquivalent',
    'name',
    'values',
  ],
};

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL Data Type Specification Schema',
  oneOf: [
    numberSchema,
    enumSchema,
    stringSchema,
    booleanSchema,
  ],
};

export default schema;
