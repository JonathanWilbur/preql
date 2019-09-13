import kinds from "../APIObjectKinds";
import AttributeSpec from "../APIObjectKinds/Attribute/spec";
import EntrySpec from "../APIObjectKinds/Entry/spec";
import StructSpec from "../APIObjectKinds/Struct/spec";
import APIObject from "../Interfaces/APIObject";
import APIObjectDatabase from "../Interfaces/APIObjectDatabase";
import APIObjectKind from "../Interfaces/APIObjectKind";
import PreqlError from "../PreqlError";

/**
 * Semantically validates a namespace, which means checking that all references
 * are valid, among other things. For instance, this function checks that all
 * `Attribute`s attach to a valid `Struct`.
 *
 * @param namespace {APIObjectDatabase} The namespace to be validated.
 * @returns {Promise} A promise resolving nothing. Ignore the resolved value.
 */
export default
async function validateNamespace (namespace: APIObjectDatabase): Promise<void[][]> {
    // Ensure unique distinguished names
    const encounteredDistinguishedNames: Map<string, APIObject<EntrySpec>> = new Map([]);
    ((namespace.kindIndex || []).entry || [])
        .filter((entry: APIObject<EntrySpec>): boolean => (typeof entry.spec.distinguishedName === "string"))
        .forEach((entry: APIObject<EntrySpec>): void => {
            if (!entry.spec.distinguishedName) return;
            if (encounteredDistinguishedNames.has(entry.spec.distinguishedName.toLowerCase())) {
                const firstEntry: APIObject<EntrySpec> = encounteredDistinguishedNames
                    .get(entry.spec.distinguishedName.toLowerCase()) as APIObject<EntrySpec>;
                throw new PreqlError(
                    "ee62701b-8d35-48f9-8d78-be0d8f3c80f3",
                    `Duplicate Entry.distinguishedName '${entry.spec.distinguishedName}'. `
                    + `The first Entry to have it was '${firstEntry.metadata.name}'. `
                    + `The second Entry to have it was '${entry.metadata.name}'.`,
                );
            } else {
                encounteredDistinguishedNames.set(entry.spec.distinguishedName.toLowerCase(), entry);
            }
        });

    // Ensure unique object identifiers
    const encounteredObjectIdentifiers: Map<string, APIObject<AttributeSpec | StructSpec>> = new Map([]);
    ((namespace.kindIndex || []).attribute || [])
        .concat(namespace.kindIndex.struct || [])
        .filter((o: APIObject<AttributeSpec | StructSpec>): boolean => (typeof o.spec.objectIdentifier === "string"))
        .forEach((obj: APIObject<AttributeSpec | StructSpec>): void => {
            if (!obj.spec.objectIdentifier) return;
            if (encounteredObjectIdentifiers.has(obj.spec.objectIdentifier)) {
                const first: APIObject<AttributeSpec | StructSpec> = encounteredObjectIdentifiers
                    .get(obj.spec.objectIdentifier) as APIObject<AttributeSpec | StructSpec>;
                throw new PreqlError(
                    "ee62701b-8d35-48f9-8d78-be0d8f3c80f3",
                    `Duplicate Object Identifier '${obj.spec.objectIdentifier}'. `
                    + `The first Attribute or Struct to have it was '${first.metadata.name}'. `
                    + `The second Attribute or Struct to have it was '${obj.metadata.name}'.`,
                );
            } else {
                encounteredObjectIdentifiers.set(obj.spec.objectIdentifier.toLowerCase(), obj);
            }
        });

    // Iterate over kinds in a namespace.
    return Promise.all(Object.entries(namespace.kindIndex)
        .map(async (k: [string, APIObject[]]): Promise<void[]> => Promise.all(
            // Iterate over objects of that kind.
            k[1].map((obj: APIObject): Promise<void> => {
                const kind: APIObjectKind | undefined = kinds[k[0]];
                if (!kind) return Promise.resolve(); // Simply do nothing if the kind is not recognized.
                return kind.validateSemantics(obj, namespace);
            }),
        )));
}
