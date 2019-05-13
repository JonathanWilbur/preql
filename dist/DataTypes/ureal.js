"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ureal = {
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
                return 'FLOAT UNSIGNED';
            if (length <= 16)
                return 'FLOAT UNSIGNED';
            if (length <= 32)
                return 'FLOAT UNSIGNED';
            if (length <= 64)
                return 'DOUBLE UNSIGNED';
            logger.warn(path, `No native unsigned floating-point type can support ${length} bits. Defaulting to DOUBLE UNSIGNED.`);
            return 'DOUBLE UNSIGNED';
        },
        checkConstraints: () => [],
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = ureal;
