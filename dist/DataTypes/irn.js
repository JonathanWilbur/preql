"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.irn = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "TEXT";
        },
        checkConstraints: (path, spec, logger) => {
            return [
                `${path[2]} RLIKE '^urn:[A-Za-z0-9][A-Za-z0-9\-]{0,30}[A-Za-z0-9]:[^\w\u0000-\u001F"#<>]+$'`
            ];
        }
    }
};
