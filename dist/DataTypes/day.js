"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const day = {
    mariadb: {
        equivalentNativeType: () => 'TINYINT UNSIGNED',
        checkConstraints: (spec) => [
            `${spec.name} > 0 AND ${spec.name} <= 31`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = day;
