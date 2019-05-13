"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fqdn = {
    mariadb: {
        equivalentNativeType: () => 'VARCHAR(253)',
        checkConstraints: (path) => [
            `${path[2]} RLIKE '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\\-_\\.]{0,251}[\\p{L}\\p{N}])?$'`,
            `LENGTH(${path[2]}) <= 253`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = fqdn;
