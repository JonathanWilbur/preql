"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sid = {
    mariadb: {
        equivalentNativeType: () => 'VARCHAR(128)',
        checkConstraints: (spec) => [
            `${spec.name} REGEXP '^S-\\d-\\d+(?:-\\d+)*$'`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = sid;
