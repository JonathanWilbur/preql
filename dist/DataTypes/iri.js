"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iri = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "TEXT";
        },
        checkConstraints: (path, spec, logger) => {
            return [
                `${path[2]} RLIKE '^[A-Za-z][A-Za-z0-9\+\.\-]+:\W+$'`
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
