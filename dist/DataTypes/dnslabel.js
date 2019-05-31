"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dnslabel = {
    mariadb: {
        equivalentNativeType: () => 'VARCHAR(63)',
        checkConstraints: (spec) => [
            `${spec.name} REGEXP '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\\-_]{0,61}[\\p{L}\\p{N}])?$'`,
            `LENGTH(${spec.name}) <= 63`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = dnslabel;
