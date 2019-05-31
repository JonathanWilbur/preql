"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oid = {
    mariadb: {
        equivalentNativeType: () => 'VARCHAR(256)',
        checkConstraints: (spec) => [
            `${spec.name} REGEXP '^\\d+(?:\\.\\d+)*$'`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = oid;
