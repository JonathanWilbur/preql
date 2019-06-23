"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegex_1 = __importDefault(require("../../identifierRegex"));
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Attribute Schema',
    type: 'object',
    additionalProperties: true,
    properties: {
        name: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        structName: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        entityName: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        databaseName: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        default: {
            type: [
                'number',
                'string',
            ],
        },
        nullable: {
            type: 'boolean',
            default: true,
        },
        type: {
            type: 'string',
            pattern: identifierRegex_1.default,
        },
        length: {
            type: 'integer',
            minimum: 1,
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
