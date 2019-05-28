"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(schema_1.default);
const kind = {
    name: 'Entity',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPath: (apiObject) => {
        const namespace = apiObject.metadata.namespace || '';
        const entity = apiObject.metadata.name;
        return `${namespace}.${entity}`;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validateStructure: (apiObject) => structureValidator(apiObject.spec),
    validateSemantics: async (apiObject, etcd) => {
        const labelNamespace = apiObject.metadata.namespace;
        if (!labelNamespace) {
            throw new Error(`No metadata.namespace defined for Entity '${apiObject.metadata.name}'.`);
        }
        // eslint-disable-next-line
        const namespaces = etcd.kindIndex.get('namespace');
        if (!namespaces) {
            throw new Error(`No namespaces defined for Entity '${apiObject.metadata.name}' to attach to.`);
        }
        const matchingNamespaceFound = namespaces
            .some((namespace) => namespace.metadata.name === labelNamespace);
        if (!matchingNamespaceFound) {
            throw new Error(`No namespaces found that are named '${labelNamespace}' for Entity `
                + `'${apiObject.metadata.name}' to attach to.`);
        }
        // eslint-disable-next-line
        const structs = etcd.kindIndex.get('struct');
        if (!structs) {
            throw new Error(`No structs defined for Entity '${apiObject.metadata.name}' to attach to.`);
        }
        const matchingStructsFound = namespaces
            .some((struct) => apiObject.spec.rootStruct === struct.metadata.name);
        if (!matchingStructsFound) {
            throw new Error(`No structs found that are named '${apiObject.spec.rootStruct}' for Entity `
                + `'${apiObject.metadata.name}' to use as the root struct.`);
        }
    },
    transpilePresenceIn: new Map([
        [
            'mariadb',
            () => '',
        ],
    ]),
    transpileAbsenceIn: new Map([
        [
            'mariadb',
            () => '',
        ],
    ]),
};
exports.default = kind;
