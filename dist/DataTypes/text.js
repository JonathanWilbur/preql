"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.text = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            const length = (("length" in spec) ? spec.length : 65535);
            if (isNaN(length))
                throw new Error("Non-numeric length received.");
            if (length < 0)
                throw new Error("Negative length received.");
            if (length === 0)
                throw new Error("Zero-length received.");
            if (length < 256)
                logger.warn(path, `A fixchar or varchar with a length of ${Math.pow(2, length)} characters could have been used instead for better performance.`);
            if (length > (Math.pow(2, 32) - 1)) {
                logger.warn(path, `No native text type can support a length that encodes on ${length} bits. Defaulting to LONGTEXT.`);
                return "LONGTEXT";
            }
            return `TEXT(${length})`;
        },
        checkConstraints: (path, spec, logger) => {
            const length = (("length" in spec) ? spec.length : 65535);
            if (isNaN(length))
                throw new Error("Non-numeric length received.");
            if (length < 0)
                throw new Error("Negative length received.");
            if (length === 0)
                throw new Error("Zero-length received.");
            return [
                `CHAR_LENGTH(${path[2]}) < ${length}`
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
