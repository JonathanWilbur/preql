"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geometry = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "GEOMETRY";
        },
        checkConstraints: (path, spec, logger) => {
            return [];
        }
    }
};
