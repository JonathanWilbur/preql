"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fqdn = {
    mariadb: {
        equivalentNativeType: () => 'VARCHAR(253)',
        checkConstraints: (spec) => [
            `${spec.name} REGEXP '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\\-_\\.]{0,251}[\\p{L}\\p{N}])?$'`,
            `LENGTH(${spec.name}) <= 253`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = fqdn;
