/**
 * This is meant to be a better replacement for `Map`. The problem with `Map`
 * is that, when it is converted to JSON, it is serialized as an empty `object`
 * (`{}`), no matter the contents.
 *
 * TypeScript has a type that seems like a viable alternative--`Record`, but
 * this has the issue of allowing keys to return `undefined` without saying
 * so in the type signature. This issue also affects TypeScript index
 * signatures (e.g. `{ [ key: string]: type }`).
 *
 * This type was defined per the recommendation of
 * [this website](https://brainlessdeveloper.com/typescript/2019/01/30/typescript-series-1-record-is-usually-not-the-best-choice/).
 */
type Dictionary<K extends string, T> = Partial<Record<K, T>>;
// Again, it seems to be a bug.
// eslint-disable-next-line no-undef
export default Dictionary;
