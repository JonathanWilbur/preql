"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json = {
    mariadb: {
        equivalentNativeType: () => 'LONGTEXT',
        checkConstraints: (path) => [
            `JSON_VALID(${path[2]})`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = json;
