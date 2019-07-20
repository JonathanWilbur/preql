import APIObjectDatabase from './Interfaces/APIObjectDatabase';
import Logger from './Interfaces/Logger';

/**
 * This is the official recommended function signature for transpiling an
 * entire `APIObjectDatabase`. It is only here to foster uniformity across
 * all PreQL-related libraries.
 *
 * This is expected to return either a `string` when transpiling for
 * a relational database, and return an `object` when transpiling a
 * JSON-like schema (because objects can be trivially converted to JSON via
 * `JSON.stringify()`.)
 *
 * @async
 * @param {APIObjectDatabase} obj The object database to be transpiled.
 * @param {Logger} logger Something that can log.
 */
type SuggestedTargetIndexHandler = (etcd: APIObjectDatabase, logger?: Logger) => Promise<string | object>;

// eslint-disable-next-line no-undef
export default SuggestedTargetIndexHandler;
