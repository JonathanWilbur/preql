"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIObjectKinds_1 = __importDefault(require("../APIObjectKinds"));
const ConsoleLogger_1 = __importDefault(require("../Loggers/ConsoleLogger"));
const MariaDBTarget = {
    transpile: (etcd) => [
        'namespace',
        // 'entity',
        'struct',
    ].map((kindName) => {
        const kind = APIObjectKinds_1.default.get(kindName);
        if (!kind)
            throw new Error(`${kindName} kind not recognized.`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const objectsOfMatchingKind = etcd.present.get(kindName);
        if (!objectsOfMatchingKind)
            return '';
        const kindTranspiler = kind.transpilePresenceIn.get('mariadb');
        if (!kindTranspiler)
            throw new Error('MariaDB not recognized.');
        return objectsOfMatchingKind
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((obj) => {
            ConsoleLogger_1.default.info([], `Transpiling ${obj.kind} '${obj.metadata.name}'.`);
            return kindTranspiler(obj, etcd);
        })
            .filter((transpilation) => transpilation !== '')
            .join('\r\n\r\n');
    }).join('\r\n\r\n'),
};
exports.default = MariaDBTarget;
