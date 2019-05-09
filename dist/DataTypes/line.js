"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.line = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "LINE";
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
