"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getPath(obj) {
    if (!obj || !obj.spec || typeof obj.spec !== "object")
        return undefined;
    if (("name" in obj.spec) && typeof obj.spec.name !== "string")
        return undefined;
    /**
     * These cases will not get handled by the catchall at the bottom, because
     * of the line that returns `undefined` if `databaseName` is undefined.
     */
    if (obj.kind.toLowerCase() === "database"
        || obj.kind.toLowerCase() === "characterset"
        || obj.kind.toLowerCase() === "collation")
        return obj.spec.name;
    if (!("databaseName" in obj.spec) || typeof obj.spec.databaseName !== "string")
        return undefined;
    let path = obj.spec.databaseName;
    if ("structName" in obj.spec && typeof obj.spec.structName === "string") {
        path += `.${obj.spec.structName}`;
    }
    else if ("childStructName" in obj.spec && typeof obj.spec.childStructName === "string") {
        path += `.${obj.spec.childStructName}`;
    }
    /**
   * If the kind is an `Entity`, we prepend a $ before its name so it does not
   * conflict with any `Struct`s, but uniqueness between entities within a
   * database is still enforced.
   */
    if (obj.kind.toLowerCase() === "entity") {
        path += `.$${obj.spec.name}`;
    }
    else if (obj.spec.name) {
        if (path.length > 0) {
            path += ".";
        }
        path += obj.spec.name;
    }
    else if (obj.spec.id) { // Only `Entry` has this.
        path += `.${obj.spec.id}`;
    }
    return path.toLowerCase();
}
exports.default = getPath;
//# sourceMappingURL=getPath.js.map