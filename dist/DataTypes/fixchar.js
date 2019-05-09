"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixchar = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            // TODO: Check that spec.length exists.
            return `CHAR(${spec.length})`;
        },
        checkConstraints: (path, spec, logger) => {
            return [];
        }
    }
};
