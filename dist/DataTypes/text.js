"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text = {
    mariadb: {
        equivalentNativeType: (path, spec, logger) => {
            const length = (('length' in spec) ? spec.length : 65535);
            if (Number.isNaN(length))
                throw new Error('Non-numeric length received.');
            if (length < 0)
                throw new Error('Negative length received.');
            if (length === 0)
                throw new Error('Zero-length received.');
            if (length < 256) {
                logger.warn(path, `A fixchar or varchar with a length of ${(2 ** length)} characters `
                    + 'could have been used instead for better performance.');
            }
            if (length > ((2 ** 32) - 1)) {
                logger.warn(path, `No native text type can support a length that encodes on ${length} bits. Defaulting to LONGTEXT.`);
                return 'LONGTEXT';
            }
            return `TEXT(${length})`;
        },
        checkConstraints: (path, spec) => {
            const length = (('length' in spec) ? spec.length : 65535);
            if (Number.isNaN(length))
                throw new Error('Non-numeric length received.');
            if (length < 0)
                throw new Error('Negative length received.');
            if (length === 0)
                throw new Error('Zero-length received.');
            return [
                `CHAR_LENGTH(${path[2]}) < ${length}`,
            ];
        },
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = text;
