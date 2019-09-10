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
export default async function
getPath (obj: APIObject): Promise<string | undefined> {
    if (!obj || !obj.spec || typeof obj.spec !== "object") return undefined;
    if (("name" in obj.spec) && typeof obj.spec.name !== "string") return undefined;
    /**
     * These cases will not get handled by the catchall at the bottom, because
     * of the line that returns `undefined` if `databaseName` is undefined.
     */
    if (
        obj.kind.toLowerCase() === "database"
        || obj.kind.toLowerCase() === "characterset"
        || obj.kind.toLowerCase() === "collation"
    ) return obj.spec.name;
    if (!("databaseName" in obj.spec) || typeof obj.spec.databaseName !== "string") return undefined;
    let path: string = obj.spec.databaseName;
    if ("structName" in obj.spec && typeof obj.spec.structName === "string") {
        path += `.${obj.spec.structName}`;
    } else if ("childStructName" in obj.spec && typeof obj.spec.childStructName === "string") {
        path += `.${obj.spec.childStructName}`;
    }
    /**
   * If the kind is an `Entity`, we prepend a $ before its name so it does not
   * conflict with any `Struct`s, but uniqueness between entities within a
   * database is still enforced.
   */
    if (obj.kind.toLowerCase() === "entity") {
        path += `.$${obj.spec.name}`;
    } else if (obj.spec.name) {
        if (path.length > 0) {
            path += ".";
        }
        path += obj.spec.name;
    } else if (obj.spec.id) { // Only `Entry` has this.
        path += `.${obj.spec.id}`;
    }
    return path.toLowerCase();
}
