"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identifierRegexString_1 = __importDefault(require("../../identifierRegexString"));
const objectIdentifierRegexString_1 = __importDefault(require("../../objectIdentifierRegexString"));
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $async: true,
    title: 'PreQL Attribute Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        structName: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        entityName: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        databaseName: {
            type: 'string',
            pattern: identifierRegexString_1.default,
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
            pattern: identifierRegexString_1.default,
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
        characterSet: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        collation: {
            type: 'string',
            pattern: identifierRegexString_1.default,
        },
        objectIdentifier: {
            type: 'string',
            pattern: objectIdentifierRegexString_1.default,
        },
        otherNames: {
            type: 'array',
            items: {
                type: 'string',
                pattern: identifierRegexString_1.default,
            },
        },
        matchingRules: {
            type: 'array',
            items: {
                type: 'string',
                pattern: objectIdentifierRegexString_1.default,
            },
        },
        orderingRules: {
            type: 'array',
            items: {
                type: 'string',
                pattern: objectIdentifierRegexString_1.default,
            },
        },
        substringRules: {
            type: 'array',
            items: {
                type: 'string',
                pattern: objectIdentifierRegexString_1.default,
            },
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
