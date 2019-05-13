"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sid = {
    mariadb: {
        equivalentNativeType: () => 'VARCHAR(128)',
        checkConstraints: (path) => [
            `${path[2]} RLIKE '^S-\\d-\\d+(?:-\\d+)*$'`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = sid;
