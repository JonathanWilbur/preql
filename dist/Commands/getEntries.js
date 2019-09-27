"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the `Entry` objects from a `namespace` as a JSON array.
 *
 * @param namespace {APIObjectDatabase} The namespace from whence to retrieve entries.
 * @returns {Promise} A promised object whose `entries` field is an array of the `Entry` objects from the `namespace`.
 */
async function getEntries(namespace) {
    const entries = namespace.kindIndex.entry;
    const result = {
        entries: {},
    };
    if (!entries)
        return result;
    entries.forEach((entry) => {
        if (!(entry.spec.databaseName in result.entries)) {
            result.entries[entry.spec.databaseName] = {};
        }
        if (!(entry.spec.structName in result.entries[entry.spec.databaseName])) {
            result.entries[entry.spec.databaseName][entry.spec.structName] = [];
        }
        result.entries[entry.spec.databaseName][entry.spec.structName].push(entry.spec.values);
    });
    return result;
}
exports.default = getEntries;
//# sourceMappingURL=getEntries.js.map