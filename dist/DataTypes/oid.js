"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oid = {
    mariadb: {
        equivalentNativeType: () => 'VARCHAR(256)',
        checkConstraints: (path) => [
            `${path[2]} RLIKE '^\\d+(?:\\.\\d+)*$'`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = oid;
