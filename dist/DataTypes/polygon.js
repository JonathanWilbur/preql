"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polygon = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "POLYGON";
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
