"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boolean = {
    mariadb: {
        equivalentNativeType: () => 'BOOLEAN',
        checkConstraints: () => [],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = boolean;
