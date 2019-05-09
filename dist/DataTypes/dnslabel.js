"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dnslabel = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "VARCHAR(63)";
        },
        checkConstraints: (path, spec, logger) => {
            return [
                `${path[2]} RLIKE '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\-_]{0,61}[\\p{L}\\p{N}])?$'`,
                `LENGTH(${path[2]}) <= 63`
            ];
        },
        getters: (path, spec, logger) => {
            return {};
        },
        setters: (path, spec, logger) => {
            return {};
        }
    }
};
