import EntrySpec from "../APIObjectKinds/Entry/spec";
import APIObject from "../Interfaces/APIObject";
import APIObjectDatabase from "../Interfaces/APIObjectDatabase";

/**
 * Returns the `Entry` objects from a `namespace` as a JSON array.
 *
 * @param namespace {APIObjectDatabase} The namespace from whence to retrieve entries.
 * @returns {Promise} A promised object whose `entries` field is an array of the `Entry` objects from the `namespace`.
 */
export default async function
getEntries (namespace: APIObjectDatabase): Promise<{ entries: Record<string, Record<string, object[]>> }> {
    const entries: APIObject<EntrySpec>[] = namespace.kindIndex.entry;
    const result: { entries: Record<string, Record<string, object[]>> } = {
        entries: {},
    };
    if (!entries) return result;
    entries.forEach((entry: APIObject<EntrySpec>): void => {
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
