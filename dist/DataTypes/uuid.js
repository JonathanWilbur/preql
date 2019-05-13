"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = {
    mariadb: {
        equivalentNativeType: () => 'CHAR(36)',
        checkConstraints: (path) => [
            `${path[2]} RLIKE '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'`,
        ],
        getters: () => ({}),
        setters: (path) => ({
            uppercase: `UPPER(${path[2]})`,
        }),
    },
};
exports.default = uuid;
