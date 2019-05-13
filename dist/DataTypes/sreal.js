"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sreal = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            const length = (('length' in spec) ? spec.length : 1);
            if (Number.isNaN(length))
                throw new Error('Non-numeric length received.');
            if (length < 0)
                throw new Error('Negative length received.');
            if (length === 0)
                throw new Error('Zero-length received.');
            if (length <= 8)
                return 'FLOAT SIGNED';
            if (length <= 16)
                return 'FLOAT SIGNED';
            if (length <= 32)
                return 'FLOAT SIGNED';
            if (length <= 64)
                return 'DOUBLE SIGNED';
            logger.warn(path, `No native signed floating-point type can support ${length} bits. Defaulting to DOUBLE SIGNED.`);
            return 'DOUBLE SIGNED';
        },
        checkConstraints: () => [],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = sreal;
