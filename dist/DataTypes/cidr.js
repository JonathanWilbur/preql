"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cidr = {
    mariadb: {
        equivalentNativeType: () => 'VARCHAR(19)',
        checkConstraints: (spec) => [
            // eslint-disable-next-line max-len
            `${spec.name} REGEXP '^(?:(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d?|0)\\.){3}(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d?|0)/(3[0-2]|[12]\\d|[1-9]|0)$'`
                // eslint-disable-next-line max-len
                + ` OR ${spec.name} REGEXP '^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/(3[0-2]|[12]\\d|[1-9]|0)$'`,
        ],
        getters: () => ({}),
        setters: (spec) => ({
            uppercase: `UPPER(${spec.name})`,
        }),
    },
};
exports.default = cidr;
