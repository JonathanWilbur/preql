import APIObject from "../Interfaces/APIObject";

export default async function
getPath (obj: APIObject): Promise<string | undefined> {
    if (!obj || !obj.spec || typeof obj.spec !== "object") return undefined;
    if (!("name" in obj.spec) || typeof obj.spec.name !== "string") return undefined;
    if (obj.kind.toLowerCase() === "database") return obj.spec.name;
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
    } else {
        if (path.length > 0) {
            path += ".";
        }
        path += obj.spec.name;
    }
    return path.toLowerCase();
}
