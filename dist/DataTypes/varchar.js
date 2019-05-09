"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.varchar = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            // TODO: Check for spec.length.
            return `VARCHAR(${spec.length})`;
        },
        checkConstraints: (path, spec, logger) => {
            return [];
        }
    }
};
