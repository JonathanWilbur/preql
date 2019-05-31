"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const varchar = {
    mariadb: {
        equivalentNativeType: (spec) => `VARCHAR(${spec.length || 256})`,
        checkConstraints: () => [],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = varchar;
