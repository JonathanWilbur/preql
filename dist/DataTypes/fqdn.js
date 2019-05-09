"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fqdn = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "VARCHAR(253)";
        },
        checkConstraints: (path, spec, logger) => {
            return [
                `${path[2]} RLIKE '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\-_\.]{0,251}[\\p{L}\\p{N}])?$'`,
                `LENGTH(${path[2]}) <= 253`
            ];
        }
    }
};
