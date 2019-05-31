"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sint = {
    mariadb: {
        equivalentNativeType: (spec, logger) => {
            if (!spec.length)
                return 'BIGINT SIGNED';
            if (spec.length === 1) {
                logger.warn(`Attribute '${spec.name}' of type 'sint' with a length `
                    + 'of 1 has been transpiled to a BOOLEAN instead.');
                return 'BOOLEAN';
            }
            if (spec.length <= 8)
                return 'TINYINT SIGNED';
            if (spec.length <= 16)
                return 'SMALLINT SIGNED';
            if (spec.length <= 32)
                return 'INTEGER SIGNED';
            if (spec.length <= 64)
                return 'BIGINT SIGNED';
            logger.warn(`No native signed integral type can support ${spec.length} bits for `
                + `attribute '${spec.name}'. Defaulting to BIGINT SIGNED.`);
            return 'BIGINT SIGNED';
        },
        checkConstraints: (spec) => {
            if (!spec.length)
                return [];
            if ([1, 8, 16, 32, 64].includes(spec.length))
                return [];
            const max = ((2 ** (spec.length - 1)) - 1);
            const min = -((2 ** (spec.length - 1)));
            return [`${spec.name} <= ${max} AND ${spec.name} >= ${min}`];
        },
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = sint;
