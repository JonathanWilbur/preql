"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const money = {
    mariadb: {
        equivalentNativeType: () => 'DECIMAL(21,2)',
        checkConstraints: () => [],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = money;
