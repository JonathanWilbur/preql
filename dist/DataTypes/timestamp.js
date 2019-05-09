"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "TIMESTAMP";
        },
        checkConstraints: (path, spec, logger) => {
            return [];
        },
        getters: (path, spec, logger) => {
            return {};
        },
        setters: (path, spec, logger) => {
            return {};
        }
    }
};
