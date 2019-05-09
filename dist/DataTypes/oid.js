"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oid = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "VARCHAR(256)";
        },
        checkConstraints: (path, spec, logger) => {
            return [
                `${path[2]} RLIKE '^\d+(?:\.\d+)*$'`
            ];
        }
    }
};
