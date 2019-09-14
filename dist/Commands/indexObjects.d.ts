import APIObject from "../Interfaces/APIObject";
import APIObjectDatabase from "../Interfaces/APIObjectDatabase";
/**
 * Creates indexed databases by namespace from a simple list of PreQL API
 * objects. It is _assumed_ that objects passed into this have already been
 * structurally validated. The object returned by the promise resolving maps
 * namespace names to their indexed databases.
 *
 * No semantic validation is performed on this index in this function. In other
 * words, this function will not check that, say, an `Attribute` refers to a
 * `Struct` that actually exists. For that functionality, see
 * `validateNamespace()`.
 *
 * @param objects {APIObject[]} A simple list of API objects, in any order.
 * @returns {Promise} A promise that resolves to a map of namespaces to their indexed databases.
 */
export default function indexObjects(objects: APIObject[]): Promise<Record<string, APIObjectDatabase>>;
//# sourceMappingURL=indexObjects.d.ts.map