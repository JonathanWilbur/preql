"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.point = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "POINT";
        },
        checkConstraints: (path, spec, logger) => {
            return [];
        }
    }
};
