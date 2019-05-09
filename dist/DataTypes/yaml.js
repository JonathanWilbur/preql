"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yaml = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "LONGTEXT";
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
