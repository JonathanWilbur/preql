import AttributeSpec from "../APIObjectKinds/Attribute/spec";
import DatabaseSpec from "../APIObjectKinds/Database/spec";
import StructSpec from "../APIObjectKinds/Struct/spec";
import APIObject from "../Interfaces/APIObject";
import APIObjectDatabase from "../Interfaces/APIObjectDatabase";

/**
 * The return type of `getTree()`.
 */
interface Tree {
    namespaces: Record<string, {
        databases: Record<string, { spec: DatabaseSpec } & {
            structs: Record<string, { spec: StructSpec } & {
                attributes: Record<string, { spec: AttributeSpec }>;
            }>;
        }>;
    }>;
}

/**
 * Returns a hierarchical representation of all namespaces--a "tree"--whose
 * penultimate nodes are namespaces and whose leaf nodes are `Attribute`s.
 *
 * @param namespaces {Record<string, APIObjectDatabase>} The namespaces from whence to build the tree.
 * @returns {Promise} A promised hierarchical representation of each namespace.
 */
export default
async function getTree (namespaces: Record<string, APIObjectDatabase>): Promise<Tree> {
    const result: Tree = { namespaces: {} };
    Object.entries(namespaces).forEach((ns: [string, APIObjectDatabase]): void => {
        const databases: APIObject<DatabaseSpec>[] = ns[1].kindIndex.database;
        const structs: APIObject<StructSpec>[] = ns[1].kindIndex.struct;
        const attributes: APIObject<AttributeSpec>[] = ns[1].kindIndex.attribute;
        result.namespaces[ns[0]] = {
            databases: {},
        };
        databases.forEach((db: APIObject<DatabaseSpec>): void => {
            const currentDatabase = {
                spec: db.spec,
                structs: {},
            };
            result.namespaces[ns[0]].databases[db.spec.name] = currentDatabase;
            structs
                .filter((struct: APIObject<StructSpec>): boolean => struct.spec.databaseName === db.spec.name)
                .forEach((struct: APIObject<StructSpec>): void => {
                    const currentStruct: { spec: StructSpec; attributes: Record<string, { spec: AttributeSpec }> } = {
                        spec: struct.spec,
                        attributes: {},
                    };
                    result.namespaces[ns[0]].databases[db.spec.name].structs[struct.spec.name] = currentStruct;
                    attributes
                        .filter((attr: APIObject<AttributeSpec>): boolean => attr.spec.databaseName === db.spec.name
                            && attr.spec.structName === struct.spec.name)
                        .forEach((attr: APIObject<AttributeSpec>): void => {
                            currentStruct.attributes[attr.spec.name] = {
                                spec: attr.spec,
                            };
                        });
                });
        });
    });
    return result;
}
