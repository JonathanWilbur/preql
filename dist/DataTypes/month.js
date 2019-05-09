"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.month = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "TINYINT UNSIGNED";
        },
        checkConstraints: (path, spec, logger) => {
            return [
                `${path[2]} > 0 AND ${path[2]} <= 12`
            ];
        }
    }
};
