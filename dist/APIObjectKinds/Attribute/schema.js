"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
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
            default: true,
        },
        type: {
            type: 'string',
        },
        length: {
            type: 'integer',
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
exports.default = schema;
