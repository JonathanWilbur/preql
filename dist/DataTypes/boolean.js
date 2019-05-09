"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolean = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "BOOLEAN";
        },
        checkConstraints: (path, spec, logger) => {
            return [];
        }
    }
};
