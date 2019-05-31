"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const month = {
    mariadb: {
        equivalentNativeType: () => 'TINYINT UNSIGNED',
        checkConstraints: (spec) => [
            `${spec.name} > 0 AND ${spec.name} <= 12`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = month;
