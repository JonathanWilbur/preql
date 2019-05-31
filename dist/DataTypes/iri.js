"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iri = {
    mariadb: {
        equivalentNativeType: () => 'TEXT',
        checkConstraints: (spec) => [
            `${spec.name} REGEXP '^[A-Za-z][A-Za-z0-9\\+\\.\\-]+:\\W+$'`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = iri;
