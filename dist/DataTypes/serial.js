"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serial = {
    mariadb: {
        equivalentNativeType: () => 'SERIAL',
        checkConstraints: () => [],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = serial;
