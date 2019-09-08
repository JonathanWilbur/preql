import APIObject from "../Interfaces/APIObject";
import APIObjectDatabase from "../Interfaces/APIObjectDatabase";
import PreqlError from "../PreqlError";
import getPath from "./getPath";
// NOTE: You can just iterate over all keys in the kindIndex afterwards to display unrecognized kinds.

export default
async function indexObjects (objects: APIObject[]): Promise<Record<string, APIObjectDatabase>> {
    const namespaces: Record<string, APIObjectDatabase> = {
        default: {
            namespace: "default",
            kindIndex: {},
            kindNameIndex: {},
            pathIndex: {},
        },
    };
    await Promise.all(objects.map(async (obj: APIObject): Promise<void> => {
        const namespaceName: string = obj.metadata.namespace || "default";
        if (!namespaces[namespaceName]) {
            namespaces[namespaceName] = {
                namespace: obj.metadata.namespace || "default",
                kindIndex: {},
                kindNameIndex: {},
                pathIndex: {},
            };
        }
        const namespace: APIObjectDatabase = namespaces[namespaceName];

        const kindName: string = obj.kind.toLowerCase();
        const kindIndexReference: APIObject[] | undefined = namespace.kindIndex[kindName];
        if (!kindIndexReference) namespace.kindIndex[kindName] = [obj];
        else kindIndexReference.push(obj);

        const kindAndName: string = `${kindName}:${obj.metadata.name.toLowerCase()}`;
        const kindNameValue: APIObject | undefined = namespace.kindNameIndex[kindAndName];
        if (!kindNameValue) namespace.kindNameIndex[kindAndName] = obj;
        else {
            throw new PreqlError(
                "f4c7907d-d613-48e7-9e80-37411d2b8e23",
                `Duplicated name: two objects in namespace '${namespaceName}' of kind `
        + `'${obj.kind}' with same name '${obj.metadata.name}'.`,
            );
        }

        const path: string | undefined = await getPath(obj);
        if (path) {
            if (path in namespace.pathIndex) {
                const first: APIObject = namespace.pathIndex[path];
                throw new PreqlError(
                    "c1e2a6ae-119e-47f8-842f-a247f34f75d8",
                    `Conflicting path between ${obj.kind} '${obj.metadata.name}' `
          + `and ${first.kind} '${first.metadata.name}'. Both have a path of `
          + `'${path}'.`,
                );
            } else {
                namespace.pathIndex[path] = obj;
            }
        }
    }));
    return Promise.resolve(namespaces);
}
