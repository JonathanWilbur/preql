"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xml = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "LONGTEXT";
        },
        checkConstraints: (path, spec, logger) => {
            return []; // TODO: Add some more checks.
        }
    }
};
