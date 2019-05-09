"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "LONGTEXT";
        },
        checkConstraints: (path, spec, logger) => {
            return [
                `JSON_VALID(${path[2]})`
            ];
        }
    }
};
