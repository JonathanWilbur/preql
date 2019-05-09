"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serial = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "SERIAL";
        },
        checkConstraints: (path, spec, logger) => {
            return [];
        }
    }
};
