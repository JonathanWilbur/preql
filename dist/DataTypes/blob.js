"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blob = {
    mariadb: {
        equivalentNativeType: (spec, logger) => {
            if (!spec.length)
                return 'BLOB';
            if (spec.length < 256) {
                logger.warn(`Attribute ${spec.name} fixblob or varblob with a length of ${2 ** spec.length} bytes`
                    + 'could have been used instead for better performance.');
            }
            if (spec.length > ((2 ** 32) - 1)) {
                logger.warn(`No native blob type can support a length of ${spec.length} bytes `
                    + `for attribute '${spec.name}'. Defaulting to LONGBLOB.`);
                return 'LONGBLOB';
            }
            return `BLOB(${spec.length})`;
        },
        checkConstraints: (spec) => {
            if (!spec.length)
                return [];
            return [`LENGTH(${spec.name}) < ${spec.length}`];
        },
        getters: () => ({}),
        setters: () => ({}),
    },
};
exports.default = blob;
