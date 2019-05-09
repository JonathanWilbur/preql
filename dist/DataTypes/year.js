"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.year = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "YEAR";
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
