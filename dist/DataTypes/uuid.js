"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            return "CHAR(36)";
        },
        checkConstraints: (path, spec, logger) => {
            return [
                `${path[2]} RLIKE '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'`
            ];
        }
    }
};
