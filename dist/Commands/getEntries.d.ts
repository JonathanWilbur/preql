import APIObjectDatabase from "../Interfaces/APIObjectDatabase";
/**
 * Returns the `Entry` objects from a `namespace` as a JSON array.
 *
 * @param namespace {APIObjectDatabase} The namespace from whence to retrieve entries.
 * @returns {Promise} A promised object whose `entries` field is an array of the `Entry` objects from the `namespace`.
 */
export default function getEntries(namespace: APIObjectDatabase): Promise<{
    entries: Record<string, Record<string, object[]>>;
}>;
//# sourceMappingURL=getEntries.d.ts.map