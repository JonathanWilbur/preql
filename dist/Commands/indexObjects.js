"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// You can just iterate over all keys in the kindIndex afterwards to display unrecognized kinds.
async function indexObjects(objects) {
    const namespaces = new Map([]);
    await Promise.all(objects
        .map(async (apiObject) => {
        if (!namespaces.has(apiObject.metadata.namespace)) {
            namespaces.set(apiObject.metadata.namespace, {
                namespace: apiObject.metadata.namespace,
                // apiVersionIndex: new Map<string, APIObject[]>([]),
                kindIndex: new Map([]),
                kindNameIndex: new Map([]),
                objectsWithInvalidSpecs: [],
            });
        }
        const namespace = namespaces.get(apiObject.metadata.namespace);
        const kindIndexReference = namespace.kindIndex.get(apiObject.kind.toLowerCase());
        if (!kindIndexReference)
            namespace.kindIndex.set(apiObject.kind.toLowerCase(), [apiObject]);
        else
            kindIndexReference.push(apiObject);
        const kindAndName = `${apiObject.kind.toLowerCase()}:${apiObject.metadata.name.toLowerCase()}`;
        const kindNameValue = namespace.kindNameIndex.get(kindAndName);
        if (!kindNameValue)
            namespace.kindNameIndex.set(kindAndName, apiObject);
        else {
            throw new Error(`Duplicated name: two objects in namespace '${apiObject.metadata.namespace}' of kind `
                + `'${apiObject.kind}' with same name '${apiObject.metadata.name}'.`);
        }
        return Promise.resolve();
    }));
    return Promise.resolve(namespaces);
}
exports.default = indexObjects;
;
