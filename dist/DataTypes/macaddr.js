"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const macaddr = {
    mariadb: {
        equivalentNativeType: () => 'VARCHAR(17)',
        checkConstraints: (spec) => [
            `${spec.name} REGEXP '^[A-Fa-f0-9]{2}(?::[A-Fa-f0-9]{2}){5}$' `
                + `OR ${spec.name} REGEXP '^[A-Fa-f0-9]{2}(?:-[A-Fa-f0-9]{2}){5}$' `
                + `OR ${spec.name} REGEXP '^[A-Fa-f0-9]{6}(:|-)?[A-Fa-f0-9]{6}$' `
                + `OR ${spec.name} REGEXP '^[A-Fa-f0-9]{4}.[A-Fa-f0-9]{4}.[A-Fa-f0-9]{4}$'`,
        ],
        getters: () => ({}),
        setters: (spec) => ({
            uppercase: `UPPER(${spec.name})`,
        }),
    },
};
exports.default = macaddr;
