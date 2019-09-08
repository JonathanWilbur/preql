import AttributeSpec from "../APIObjectKinds/Attribute/spec";
import DatabaseSpec from "../APIObjectKinds/Database/spec";
import StructSpec from "../APIObjectKinds/Struct/spec";
import APIObjectDatabase from "../Interfaces/APIObjectDatabase";
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
export default function getTree(namespaces: Record<string, APIObjectDatabase>): Promise<Tree>;
export {};
//# sourceMappingURL=getTree.d.ts.map