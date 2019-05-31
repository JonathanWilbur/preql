"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIObjectKinds_1 = __importDefault(require("../APIObjectKinds"));
const Targets_1 = __importDefault(require("../Targets"));
const ConsoleLogger_1 = __importDefault(require("../Loggers/ConsoleLogger"));
// TODO: Implement error handling here.
const main = async (namespace, dialect, objects) => {
    /**
     * This is named after etcd, which is the database that Kubernetes uses to
     * store configuration and state information. This etcd serves a similar
     * purpose without being a full-blown database. It could have been an array,
     * but I went with a Map so that objects could be quickly filtered by kind.
     * That said, the key of the etcd map is the kind, and the value is an array
     * of API objects of that kind.
     *
     * This is not pre-populated with keys from all recognized kinds as of now.
     * Care should be taken by developer to ensure that the key exists before
     * attempting to read its value, and care should be taken to ensure that
     * the key is created upon writing if it does not exist.
     */
    const etcd = {
        allObjects: [],
        kindIndex: new Map([]),
        pathIndex: new Map([]),
    };
    const objectsWithinSelectedNamespace = objects
        .filter((apiOject) => (apiOject.metadata.namespace || 'default') === namespace);
    const encounteredNames = new Set([]);
    await Promise.all(objectsWithinSelectedNamespace
        .map(async (apiObject) => {
        const kind = APIObjectKinds_1.default.get(apiObject.kind.toLowerCase());
        if (!kind) {
            ConsoleLogger_1.default.warn(`Kind '${apiObject.kind}' not recognized.`);
            return Promise.resolve();
        }
        await kind.validateStructure(apiObject, etcd);
        if (apiObject.metadata.labels) {
            // eslint-disable-next-line no-param-reassign
            apiObject.metadata.labels = new Map(Object.entries(apiObject.metadata.labels));
        }
        if (apiObject.metadata.annotations) {
            // eslint-disable-next-line no-param-reassign
            apiObject.metadata.annotations = new Map(Object.entries(apiObject.metadata.annotations));
        }
        const kindIndexReference = etcd.kindIndex.get(apiObject.kind.toLowerCase());
        if (!kindIndexReference) {
            etcd.kindIndex.set(apiObject.kind.toLowerCase(), [apiObject]);
        }
        else {
            if (encounteredNames.has(apiObject.metadata.name)) {
                throw new Error(`Duplicated name: two objects in namespace '${namespace}' of kind `
                    + `'${apiObject.kind}' with same name '${apiObject.metadata.name}'.`);
            }
            kindIndexReference.push(apiObject);
        }
        encounteredNames.add(apiObject.metadata.name);
        const path = kind.getPath(apiObject);
        const pathIndexReference = etcd.pathIndex.get(path);
        if (!pathIndexReference) {
            etcd.pathIndex.set(path, [apiObject]);
        }
        else {
            pathIndexReference.push(apiObject);
        }
        etcd.allObjects.push(apiObject);
        return Promise.resolve();
    }));
    await Promise.all(Array.from(etcd.kindIndex.keys())
        .map(async (kindName) => {
        const kind = APIObjectKinds_1.default.get(kindName);
        if (!kind)
            return Promise.reject();
        const objectsOfMatchingKind = etcd.kindIndex.get(kindName);
        if (!objectsOfMatchingKind)
            return Promise.reject();
        await Promise
            .all(objectsOfMatchingKind
            .map((oomk) => kind.validateSemantics(oomk, etcd)));
        return Promise.resolve();
    }));
    const targetTranspiler = Targets_1.default.get(dialect);
    if (!(targetTranspiler))
        throw new Error(`Target '${dialect}' not understood.`);
    return { value: targetTranspiler.transpile(etcd) };
};
exports.default = main;
