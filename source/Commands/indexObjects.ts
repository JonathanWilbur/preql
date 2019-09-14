import APIObject from "../Interfaces/APIObject";
import APIObjectDatabase from "../Interfaces/APIObjectDatabase";
import PreqlError from "../PreqlError";
import getPath from "./getPath";
// NOTE: You can just iterate over all keys in the kindIndex afterwards to display unrecognized kinds.

/**
 * Creates indexed databases by namespace from a simple list of PreQL API
 * objects. It is _assumed_ that objects passed into this have already been
 * structurally validated. The object returned by the promise resolving maps
 * namespace names to their indexed databases.
 *
 * No semantic validation is performed on this index in this function. In other
 * words, this function will not check that, say, an `Attribute` refers to a
 * `Struct` that actually exists. For that functionality, see
 * `validateNamespace()`.
 *
 * @param objects {APIObject[]} A simple list of API objects, in any order.
 * @returns {Promise} A promise that resolves to a map of namespaces to their indexed databases.
 */
export default
async function indexObjects (objects: APIObject[]): Promise<Record<string, APIObjectDatabase>> {
    const namespaces: Record<string, APIObjectDatabase> = {
        default: {
            namespace: "default",
            kindIndex: {},
            kindNameIndex: {},
            pathIndex: {},
            objectIdentifierIndex: {},
            distinguishedNameIndex: {},
        },
    };
    await Promise.all(objects.map(async (obj: APIObject): Promise<void> => {
        const namespaceName: string = obj.metadata.namespace ? obj.metadata.namespace.toLowerCase() : "default";
        if (!namespaces[namespaceName]) {
            namespaces[namespaceName] = {
                namespace: obj.metadata.namespace ? obj.metadata.namespace.toLowerCase() : "default",
                kindIndex: {},
                kindNameIndex: {},
                pathIndex: {},
                objectIdentifierIndex: {},
                distinguishedNameIndex: {},
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

        if (obj.spec.objectIentifier) {
            if (obj.spec.objectIentifier.toLowerCase() in namespace.objectIdentifierIndex) {
                throw new PreqlError(
                    "2322cab3-ba58-4eb9-8838-bda90acb5181",
                    `Duplicate object identifier ${obj.spec.objectIentifier} `
                    + `in ${obj.kind} '${obj.metadata.name}'.`,
                );
            }
            namespace.objectIdentifierIndex[obj.spec.objectIentifier.toLowerCase()] = obj;
        }

        if (obj.spec.distinguishedName) {
            if (obj.spec.distinguishedName.toLowerCase() in namespace.distinguishedNameIndex) {
                throw new PreqlError(
                    "2322cab3-ba58-4eb9-8838-bda90acb5181",
                    `Duplicate distinguished name ${obj.spec.distinguishedName} `
                    + `in ${obj.kind} '${obj.metadata.name}'.`,
                );
            }
            namespace.distinguishedNameIndex[obj.spec.distinguishedName.toLowerCase()] = obj;
        }
    }));
    return namespaces;
}
