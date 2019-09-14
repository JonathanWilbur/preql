import AttributeSpec from "../APIObjectKinds/Attribute/spec";
import PlainIndexSpec from "../APIObjectKinds/PlainIndex/spec";
import SpatialIndexSpec from "../APIObjectKinds/SpatialIndex/spec";
import TextIndexSpec from "../APIObjectKinds/TextIndex/spec";
import UniqueIndexSpec from "../APIObjectKinds/UniqueIndex/spec";
import APIObject from "../Interfaces/APIObject";
import APIObjectDatabase from "../Interfaces/APIObjectDatabase";

type IndexSpec = PlainIndexSpec | TextIndexSpec | SpatialIndexSpec | UniqueIndexSpec;

/**
 * Returns an object whose `attributes` property is an object whose keys are
 * `Attribute` paths, and whose values are booleans indicating whether or not
 * attribute is indexed.
 *
 * @param namespace {APIObjectDatabase} The namespace in which to find attributes.
 * @returns {Promise} A promised object with list of paths mapped to booleans indicating whether they were indexed.
 */
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
