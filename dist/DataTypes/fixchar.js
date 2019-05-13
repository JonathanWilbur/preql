"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fixchar = {
    mariadb: {
        // TODO: Check that spec.length exists.
        equivalentNativeType: (path, spec) => `CHAR(${spec.length})`,
        checkConstraints: () => [],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = fixchar;
