import SchemaSchema from './SchemaSchema';
import ColumnSchema from './ColumnSchema';

const rootSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'PreQL Root Schema',
  type: 'object',
  additionalProperties: true,
  properties: {
    interfaces: {
      type: 'object',
      additionalProperties: {
        type: 'object',
        // items: ColumnSchema,
        additionalProperties: ColumnSchema,
      },
    },
    // roles: RoleSchema
    schema: {
      type: 'object',
      additionalProperties: SchemaSchema,
    },
    // users: UserSchema
  },
  required: [],
};

export default rootSchema;
