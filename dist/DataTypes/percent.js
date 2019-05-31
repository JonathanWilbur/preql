"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const percent = {
    mariadb: {
        equivalentNativeType: () => 'DOUBLE UNSIGNED',
        checkConstraints: (spec) => [
            `${spec.name} <= 100.00000000`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = percent;
