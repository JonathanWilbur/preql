import APIObject from '../Interfaces/APIObject';
import APIObjectKind from '../Interfaces/APIObjectKind';
import APIObjectDatabase from '../Interfaces/APIObjectDatabase';
import kinds from '../APIObjectKinds';
import { EntrySpec } from '..';
import PreqlError from '../PreqlError';

export default
async function validateNamespace(namespace: APIObjectDatabase) {
  // Ensure Unique distinguishedNames
  const encounteredDistinguishedNames: Map<string, APIObject<EntrySpec>> = new Map([]);
  (namespace.kindIndex.entry || [])
    .filter((entry: APIObject<EntrySpec>): boolean => (typeof entry.spec.distinguishedName === 'string'))
    .forEach((entry: APIObject<EntrySpec>): void => {
      if (!entry.spec.distinguishedName) return;
      if (encounteredDistinguishedNames.has(entry.spec.distinguishedName.toLowerCase())) {
        const firstEntry: APIObject<EntrySpec> = encounteredDistinguishedNames
          .get(entry.spec.distinguishedName.toLowerCase()) as APIObject<EntrySpec>;
        throw new PreqlError(
          'ee62701b-8d35-48f9-8d78-be0d8f3c80f3',
          `Duplicate Entry.distinguishedName '${entry.spec.distinguishedName}'. `
          + `The first Entry to have it was '${firstEntry.metadata.name}'. `
          + `The second Entry to have it was '${entry.metadata.name}'.`,
        );
      } else {
        encounteredDistinguishedNames.set(entry.spec.distinguishedName.toLowerCase(), entry);
      }
    });

  // Iterate over kinds in a namespace.
  return Promise.all(Object.entries(namespace.kindIndex)
    .map(async (k: [string, APIObject[]]) => Promise.all(
      // Iterate over objects of that kind.
      k[1].map((obj: APIObject) => {
        const kind: APIObjectKind | undefined = kinds[k[0]];
        if (!kind) return Promise.resolve(); // Simply do nothing if the kind is not recognized.
        return kind.validateSemantics(obj, namespace);
      }),
    )));
};
