"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ureal = {
    mariadb: {
        equivalentNativeType: (spec, logger) => {
            if (!spec.length)
                return 'DOUBLE UNSIGNED';
            if (spec.length <= 8)
                return 'FLOAT UNSIGNED';
            if (spec.length <= 16)
                return 'FLOAT UNSIGNED';
            if (spec.length <= 32)
                return 'FLOAT UNSIGNED';
            if (spec.length <= 64)
                return 'DOUBLE UNSIGNED';
            logger.warn(`No native unsigned floating-point type can support ${spec.length} bits `
                + `for attribute '${spec.name}'. Defaulting to DOUBLE UNSIGNED.`);
            return 'DOUBLE UNSIGNED';
        },
        checkConstraints: () => [],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = ureal;
