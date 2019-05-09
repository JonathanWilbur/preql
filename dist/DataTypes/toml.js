"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toml = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "LONGTEXT";
        },
        checkConstraints: (path, spec, logger) => {
            return [];
        }
    }
};
