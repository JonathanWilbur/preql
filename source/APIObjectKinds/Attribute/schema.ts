const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $async: true,
  title: 'PreQL Attribute Schema',
  type: 'object',
  additionalProperties: true,
  properties: {
    name: {
      type: 'string',
    },
    structName: {
      type: 'string',
    },
    entityName: {
      type: 'string',
    },
    databaseName: {
      type: 'string',
    },
    // According to [this](https://stackoverflow.com/questions/16826128/why-is-this-json-schema-invalid-using-any-type),
    // {} will effectively give "default" an "any" type.
    // TODO: Make this string | number
    default: {},
    nullable: {
      type: 'boolean',
      default: true, // WARNING: Ajv will only respect the defaults if you set the useDefaults option!
    },
    type: {
      type: 'string', // TODO: Add data type validation.
    },
    length: {
      type: 'integer',
      minimum: 1,
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
    // Mostly used for LDAP: Whether an entity can have multiple of these attributes.
    // See: http://www.openldap.org/doc/admin22/schema.html
    // If multiValued with an RDBMS target, it should be broken into its own separate table,
    // and implement a FKC linking it to the parent table.
    multiValued: {
      type: 'boolean',
      default: false,
    },
  },
  required: [
    'name',
    'structName',
    // 'entityName',
    'databaseName',
    'type',
  ],
};

export default schema;
