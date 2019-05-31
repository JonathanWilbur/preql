"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text = {
    mariadb: {
        equivalentNativeType: (spec, logger) => {
            if (!spec.length)
                return 'TEXT';
            if (spec.length < 256) {
                logger.warn(`Attribute ${spec.name} fixchar or varchar with a length of ${2 ** spec.length} bytes`
                    + 'could have been used instead for better performance.');
            }
            if (spec.length > ((2 ** 32) - 1)) {
                logger.warn(`No native text type can support a length of ${spec.length} bytes `
                    + `for attribute '${spec.name}'. Defaulting to LONGTEXT.`);
                return 'LONGTEXT';
            }
            return `TEXT(${spec.length})`;
        },
        checkConstraints: (spec) => {
            if (!spec.length)
                return [];
            return [
                `CHAR_LENGTH(${spec.name}) < ${spec.length}`,
            ];
        },
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = text;
