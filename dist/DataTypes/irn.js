"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const irn = {
    mariadb: {
        equivalentNativeType: () => 'TEXT',
        checkConstraints: (path) => [
            `${path[2]} RLIKE '^urn:[A-Za-z0-9][A-Za-z0-9\\-]{0,30}[A-Za-z0-9]:[^\\w\\u0000-\\u001F"#<>]+$'`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = irn;
