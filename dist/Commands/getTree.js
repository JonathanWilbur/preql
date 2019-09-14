"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a hierarchical representation of all namespaces--a "tree"--whose
 * penultimate nodes are namespaces and whose leaf nodes are `Attribute`s.
 *
 * @param namespaces {Record<string, APIObjectDatabase>} The namespaces from whence to build the tree.
 * @returns {Promise} A promised hierarchical representation of each namespace.
 */
async function getTree(namespaces) {
    const result = { namespaces: {} };
    Object.entries(namespaces).forEach((ns) => {
        const databases = ns[1].kindIndex.database;
        const structs = ns[1].kindIndex.struct;
        const attributes = ns[1].kindIndex.attribute;
        result.namespaces[ns[0]] = {
            databases: {},
        };
        databases.forEach((db) => {
            const currentDatabase = {
                spec: db.spec,
                structs: {},
            };
            result.namespaces[ns[0]].databases[db.spec.name] = currentDatabase;
            structs
                .filter((struct) => struct.spec.databaseName === db.spec.name)
                .forEach((struct) => {
                const currentStruct = {
                    spec: struct.spec,
                    attributes: {},
                };
                result.namespaces[ns[0]].databases[db.spec.name].structs[struct.spec.name] = currentStruct;
                attributes
                    .filter((attr) => attr.spec.databaseName === db.spec.name
                    && attr.spec.structName === struct.spec.name)
                    .forEach((attr) => {
                    currentStruct.attributes[attr.spec.name] = {
                        spec: attr.spec,
                    };
                });
            });
        });
    });
    return result;
}
exports.default = getTree;
//# sourceMappingURL=getTree.js.map