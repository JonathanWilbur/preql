"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getEntries(namespace) {
    const entries = namespace.kindIndex.entry;
    const result = { entries: {} };
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
;
