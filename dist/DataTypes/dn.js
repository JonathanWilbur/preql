"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://stackoverflow.com/questions/20360360/how-long-maximum-characters-is-an-ldap-distinguished-name
const dn = {
    mariadb: {
        equivalentNativeType: () => 'VARCHAR(256)',
        checkConstraints: (spec) => [
            `${spec.name} REGEXP '^\\X=\\X(?:(\\,|;)\\X=\\X)*$'`,
        ],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = dn;
