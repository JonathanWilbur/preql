import APIObject from "../Interfaces/APIObject";
import APIObjectDatabase from "../Interfaces/APIObjectDatabase";
import AttributeSpec from "../APIObjectKinds/Attribute/spec";
import PlainIndexSpec from "../APIObjectKinds/PlainIndex/spec";
import TextIndexSpec from "../APIObjectKinds/TextIndex/spec";
import SpatialIndexSpec from "../APIObjectKinds/SpatialIndex/spec";
import UniqueIndexSpec from "../APIObjectKinds/UniqueIndex/spec";

type IndexSpec = PlainIndexSpec | TextIndexSpec | SpatialIndexSpec | UniqueIndexSpec;

export default async function
getIndexedAttributes (namespace: APIObjectDatabase): Promise<{ attributes: Record<string, boolean> }> {
    const attributes: APIObject<AttributeSpec>[] = (namespace.kindIndex.attribute || []);
    const indexes: APIObject<IndexSpec>[] = (namespace.kindIndex.plainindex || [])
        .concat(namespace.kindIndex.textindex || [])
        .concat(namespace.kindIndex.spatialindex || [])
        .concat(namespace.kindIndex.uniqueindex || []);
    const result: { attributes: Record<string, boolean> } = {
        attributes: {},
    };
    attributes.forEach((attr: APIObject<AttributeSpec>): void => {
        const path: string = `${attr.spec.databaseName.toLowerCase()}.`
      + `${attr.spec.structName.toLowerCase()}.`
      + `${attr.spec.name.toLowerCase()}`;
        result.attributes[path] = false;
    });
    indexes.forEach((index: APIObject<IndexSpec>): void => {
        index.spec.keyAttributes.forEach((ka): void => {
            const path: string = `${index.spec.databaseName.toLowerCase()}.`
                + `${index.spec.structName.toLowerCase()}.`
                + `${ka.name.toLowerCase()}`;
            result.attributes[path] = true;
        });
    });
    return result;
}
