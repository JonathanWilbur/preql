"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iri = {
    mariadb: {
        equivalentNativeType: () => 'TEXT',
        checkConstraints: (path) => [
            `${path[2]} RLIKE '^[A-Za-z][A-Za-z0-9\\+\\.\\-]+:\\W+$'`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = iri;
