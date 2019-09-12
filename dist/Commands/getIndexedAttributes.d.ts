import APIObjectDatabase from "../Interfaces/APIObjectDatabase";
/**
 * Returns an object whose `attributes` property is an object whose keys are
 * `Attribute` paths, and whose values are booleans indicating whether or not
 * attribute is indexed.
 * @param namespace {APIObjectDatabase} The namespace in which to find attributes.
 */
export default function getIndexedAttributes(namespace: APIObjectDatabase): Promise<{
    attributes: Record<string, boolean>;
}>;
//# sourceMappingURL=getIndexedAttributes.d.ts.map