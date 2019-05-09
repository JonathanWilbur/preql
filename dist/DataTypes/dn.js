"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://stackoverflow.com/questions/20360360/how-long-maximum-characters-is-an-ldap-distinguished-name
exports.dn = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "VARCHAR(256)";
        },
        checkConstraints: (path, spec, logger) => {
            return [
                `${path[2]} RLIKE '^\\X=\\X(?:(\\,|;)\\X=\\X)*$'`
            ];
        }
    }
};
