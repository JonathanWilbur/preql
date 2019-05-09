"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.time = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "TIME";
        },
        checkConstraints: (path, spec, logger) => {
            return [];
        }
    }
};
