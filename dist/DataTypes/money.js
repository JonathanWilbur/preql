"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.money = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "DECIMAL(21,2)";
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
