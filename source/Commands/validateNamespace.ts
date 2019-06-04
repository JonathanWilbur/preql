import APIObject from '../Interfaces/APIObject';
import APIObjectKind from '../Interfaces/APIObjectKind';
import APIObjectDatabase from '../Interfaces/APIObjectDatabase';
import kinds from '../APIObjectKinds';

export default
async function validateNamespace(namespace: APIObjectDatabase) {
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
