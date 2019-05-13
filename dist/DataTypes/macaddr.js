"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// FIXME: BINARY(6), yet UPPER()? Wuuut?
const macaddr = {
    mariadb: {
        equivalentNativeType: () => 'BINARY(6)',
        checkConstraints: () => [],
        getters: () => ({}),
        setters: (path) => ({
            uppercase: `UPPER(${path[2]})`,
        }),
    },
};
exports.default = macaddr;
