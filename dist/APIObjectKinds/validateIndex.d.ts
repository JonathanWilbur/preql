import APIObject from "../Interfaces/APIObject";
import APIObjectDatabase from "../Interfaces/APIObjectDatabase";
/**
 * Since all of the index object kinds are so similar, this semantic validation
 * has been deduplicated into this function. This function validates that an
 * index-like API object is semantically valid.
 *
 * @param obj {APIObject} The object to be validated.
 * @param etcd {APIObjectDatabase} The database of objects against which to validate the object.
 * @returns {Promise} A `Promise` that resolves if it is valid, or rejects if not.
 */
export default function validateIndex(obj: APIObject, etcd: APIObjectDatabase): Promise<void>;
//# sourceMappingURL=validateIndex.d.ts.map