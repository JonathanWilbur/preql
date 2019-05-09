"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uint = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            const length = (("length" in spec) ? spec.length : 1);
            if (isNaN(length))
                throw new Error("Non-numeric length received.");
            if (length < 0)
                throw new Error("Negative length received.");
            if (length === 0)
                throw new Error("Zero-length received.");
            if (length === 1) {
                logger.warn(path, "uint with a length of 1 has been transpiled to a BOOLEAN.");
                return "BOOLEAN";
            }
            if (length <= 8)
                return "TINYINT UNSIGNED";
            if (length <= 16)
                return "SMALLINT UNSIGNED";
            if (length <= 32)
                return "INTEGER UNSIGNED";
            if (length <= 64)
                return "BIGINT UNSIGNED";
            logger.warn(path, `No native unsigned integral type can support ${length} bits. Defaulting to BIGINT UNSIGNED.`);
            return "BIGINT UNSIGNED";
        },
        checkConstraints: (path, spec, logger) => {
            const length = (("length" in spec) ? spec.length : 1);
            if (isNaN(length))
                throw new Error("Non-numeric length received.");
            if (length < 0)
                throw new Error("Negative length received.");
            if (length === 0)
                throw new Error("Zero-length received.");
            if ([1, 8, 16, 32, 64].includes(length))
                return [];
            const max = Math.pow(2, length);
            return [`${path[2]} <= ${max}`];
        },
        getters: (path, spec, logger) => {
            return {};
        },
        setters: (path, spec, logger) => {
            return {};
        }
    }
};
