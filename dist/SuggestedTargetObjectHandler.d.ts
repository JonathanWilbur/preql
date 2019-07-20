import APIObject from './Interfaces/APIObject';
import APIObjectDatabase from './Interfaces/APIObjectDatabase';
import Logger from './Interfaces/Logger';
/**
 * This is the official recommended function signature for transpiling an
 * `APIObject`. It is only here to foster uniformity across all PreQL-related
 * libraries.
 *
 * This is expected to return either a `string` when transpiling for
 * a relational database, and return an `object` when transpiling a
 * JSON-like schema (because objects can be trivially converted to JSON via
 * `JSON.stringify()`.)
 *
 * @async
 * @param {APIObject} obj The object to be transpiled.
 * @param {Logger} logger Something that can log.
 * @param {APIObjectDatabase} etcd An optional object database, typically for looking up other objects.
 */
declare type SuggestedTargetObjectHandler = (obj: APIObject, logger?: Logger, etcd?: APIObjectDatabase) => Promise<string | object>;
export default SuggestedTargetObjectHandler;
