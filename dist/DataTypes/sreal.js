"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sreal = {
    mariadb: {
        equivalentNativeType: (spec, logger) => {
            if (!spec.length)
                return 'DOUBLE SIGNED';
            if (spec.length <= 8)
                return 'FLOAT SIGNED';
            if (spec.length <= 16)
                return 'FLOAT SIGNED';
            if (spec.length <= 32)
                return 'FLOAT SIGNED';
            if (spec.length <= 64)
                return 'DOUBLE SIGNED';
            logger.warn(`No native signed floating-point type can support ${spec.length} bits `
                + `for attribute '${spec.name}'. Defaulting to DOUBLE SIGNED.`);
            return 'DOUBLE SIGNED';
        },
        checkConstraints: () => [],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = sreal;
