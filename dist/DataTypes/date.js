"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "DATE";
        },
        checkConstraints: (path, spec, logger) => {
            return [];
        }
    }
};