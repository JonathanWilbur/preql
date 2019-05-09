"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolean = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "BOOLEAN";
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
