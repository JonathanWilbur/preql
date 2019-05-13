"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const varchar = {
    mariadb: {
        // TODO: Check for spec.length.
        equivalentNativeType: (path, spec) => `VARCHAR(${spec.length})`,
        checkConstraints: () => [],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = varchar;
