"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const month = {
    mariadb: {
        equivalentNativeType: () => 'TINYINT UNSIGNED',
        checkConstraints: (path) => [
            `${path[2]} > 0 AND ${path[2]} <= 12`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = month;
