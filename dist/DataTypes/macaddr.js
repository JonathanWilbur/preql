"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.macaddr = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "BINARY(6)";
        },
        checkConstraints: (path, spec, logger) => {
            return [];
        },
        getters: (path, spec, logger) => {
            return {};
        },
        setters: (path, spec, logger) => {
            return {
                "uppercase": `UPPER(${path[2]})`
            };
        }
    }
};
