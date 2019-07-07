"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getIndexedAttributes(namespace) {
    const attributes = (namespace.kindIndex.attribute || []);
    const indexes = (namespace.kindIndex.plainindex || [])
        .concat(namespace.kindIndex.textindex || [])
        .concat(namespace.kindIndex.spatialindex || [])
        .concat(namespace.kindIndex.uniqueindex || []);
    const result = {
        attributes: {},
    };
    attributes.forEach((attr) => {
        const path = `${attr.spec.databaseName.toLowerCase()}.`
            + `${attr.spec.structName.toLowerCase()}.`
            + `${attr.spec.name.toLowerCase()}`;
        result.attributes[path] = false;
    });
    indexes.forEach((index) => {
        index.spec.keyAttributes.forEach(kc => {
            const path = `${index.spec.databaseName.toLowerCase()}.`
                + `${index.spec.structName.toLowerCase()}.`
                + `${kc.name.toLowerCase()}`;
            result.attributes[path] = true;
        });
    });
    return result;
}
exports.default = getIndexedAttributes;
;
