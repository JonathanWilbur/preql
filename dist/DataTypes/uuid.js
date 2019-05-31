"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = {
    mariadb: {
        equivalentNativeType: () => 'CHAR(36)',
        checkConstraints: (spec) => [
            `${spec.name} REGEXP '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'`,
        ],
        getters: () => ({}),
        setters: (spec) => ({
            uppercase: `UPPER(${spec.name})`,
        }),
    },
};
exports.default = uuid;
