import APIObject from '../Interfaces/APIObject';
import APIObjectKind from '../APIObjectKind';
import APIObjectDatabase from '../Interfaces/APIObjectDatabase';
import kinds from '../APIObjectKinds';

export
async function validateSemantics(namespaces: Map<string, APIObjectDatabase>) {
  // Iterate over namespaces
  return Promise.all(Array.from(namespaces.entries()).map(async (ns: [string, APIObjectDatabase]) => Promise.all(
    // Iterate over kinds in a namespace.
    Array.from(ns[1].kindIndex.entries()).map(async (k: [string, APIObject[]]) => Promise.all(
      // Iterate over objects of that kind.
      k[1].map((obj: APIObject) => {
        const kind: APIObjectKind | undefined = kinds.get(k[0]);
        if (!kind) return Promise.resolve(); // Simply do nothing if the kind is not recognized.
        return kind.validateSemantics(obj, ns[1]);
      }),
    )),
  )));
};

export default
async function validateNamespace(namespace: APIObjectDatabase) {
  // Iterate over kinds in a namespace.
  return Promise.all(Array.from(namespace.kindIndex.entries())
    .map(async (k: [string, APIObject[]]) => Promise.all(
      // Iterate over objects of that kind.
      k[1].map((obj: APIObject) => {
        const kind: APIObjectKind | undefined = kinds.get(k[0]);
        if (!kind) return Promise.resolve(); // Simply do nothing if the kind is not recognized.
        return kind.validateSemantics(obj, namespace);
      }),
    )));
};
