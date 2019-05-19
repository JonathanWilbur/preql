"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ForeignKeyConstraintSchema = {
    title: 'PreQL Foreign Key Constraint Schema',
    type: 'object',
    properties: {
        comment: {
            // I don't actually know if this is supported by anything.
            type: 'string',
        },
        columns: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        // TODO: Support this (RESTRICT, CASCADE, SET NULL)
        onDelete: {
            type: 'string',
        },
        // TODO: Support this: (RESTRICT, CASCADE, SET NULL)
        onUpdate: {
            type: 'string',
        },
        referenceTable: {
            type: 'string',
        },
        referenceColumns: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    },
    required: [
        'columns',
        // TODO: Make referenceTable default to the current table.
        'referenceTable',
        'referenceColumns',
    ],
};
exports.default = ForeignKeyConstraintSchema;
