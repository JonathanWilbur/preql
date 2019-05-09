"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datetime = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "DATETIME";
        },
        checkConstraints: (path, spec, logger) => {
            return [];
        }
    }
};
