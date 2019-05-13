"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const day = {
    mariadb: {
        equivalentNativeType: () => 'TINYINT UNSIGNED',
        checkConstraints: (path) => [
            `${path[2]} > 0 AND ${path[2]} <= 31`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = day;
