"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.percent = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "DOUBLE UNSIGNED";
        },
        checkConstraints: (path, spec, logger) => {
            return [
                `${path[0]} <= 100.00000000`
            ];
        }
    }
};
