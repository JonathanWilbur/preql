import APIObject from "../Interfaces/APIObject";
/**
 * Return a dot-delimited path of an object, as is commonly used in relational
 * databases. Some elements do not return paths altogether. For example, an
 * `Attribute`, which corresponds to a column in a relational database might
 * have a path of the form `database.struct.attribute`, but a `Server` object
 * will return an `undefined` path, because it is outside of this hierarchy
 * entirely.
 *
 * @param obj {APIObject} The object whose path is to be obtained.
 * @returns The path of the object, or `undefined` if not path is applicable.
 */
export default function getPath(obj: APIObject): Promise<string | undefined>;
//# sourceMappingURL=getPath.d.ts.map