"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json = {
    mariadb: {
        equivalentNativeType: () => 'LONGTEXT',
        checkConstraints: (spec) => [
            `JSON_VALID(${spec.name})`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = json;
