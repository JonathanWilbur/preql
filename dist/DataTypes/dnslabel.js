"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dnslabel = {
    mariadb: {
        equivalentNativeType: () => 'VARCHAR(63)',
        checkConstraints: (path) => [
            `${path[2]} RLIKE '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\\-_]{0,61}[\\p{L}\\p{N}])?$'`,
            `LENGTH(${path[2]}) <= 63`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = dnslabel;
