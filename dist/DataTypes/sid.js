"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sid = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "VARCHAR(128)";
        },
        checkConstraints: (path, spec, logger) => {
            return [
                `${path[2]} RLIKE '^S-\d-\d+(?:-\d+)*$'`
            ];
        }
    }
};
