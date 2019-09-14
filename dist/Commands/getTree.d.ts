import AttributeSpec from "../APIObjectKinds/Attribute/spec";
import DatabaseSpec from "../APIObjectKinds/Database/spec";
import StructSpec from "../APIObjectKinds/Struct/spec";
import APIObjectDatabase from "../Interfaces/APIObjectDatabase";
/**
 * The return type of `getTree()`.
 */
interface Tree {
    namespaces: Record<string, {
        databases: Record<string, {
            spec: DatabaseSpec;
        } & {
            structs: Record<string, {
                spec: StructSpec;
            } & {
                attributes: Record<string, {
                    spec: AttributeSpec;
                }>;
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
export default function getTree(namespaces: Record<string, APIObjectDatabase>): Promise<Tree>;
export {};
//# sourceMappingURL=getTree.d.ts.map