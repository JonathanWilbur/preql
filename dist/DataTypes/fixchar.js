"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fixchar = {
    mariadb: {
        equivalentNativeType: (spec) => `CHAR(${spec.length || 256})`,
        checkConstraints: () => [],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = fixchar;
