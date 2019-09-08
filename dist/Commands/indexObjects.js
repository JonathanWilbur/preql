"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PreqlError_1 = __importDefault(require("../PreqlError"));
const getPath_1 = __importDefault(require("./getPath"));
// NOTE: You can just iterate over all keys in the kindIndex afterwards to display unrecognized kinds.
async function indexObjects(objects) {
    const namespaces = {
        default: {
            namespace: "default",
            kindIndex: {},
            kindNameIndex: {},
            pathIndex: {},
        },
    };
    await Promise.all(objects.map(async (obj) => {
        const namespaceName = obj.metadata.namespace || "default";
        if (!namespaces[namespaceName]) {
            namespaces[namespaceName] = {
                namespace: obj.metadata.namespace || "default",
                kindIndex: {},
                kindNameIndex: {},
                pathIndex: {},
            };
        }
        const namespace = namespaces[namespaceName];
        const kindName = obj.kind.toLowerCase();
        const kindIndexReference = namespace.kindIndex[kindName];
        if (!kindIndexReference)
            namespace.kindIndex[kindName] = [obj];
        else
            kindIndexReference.push(obj);
        const kindAndName = `${kindName}:${obj.metadata.name.toLowerCase()}`;
        const kindNameValue = namespace.kindNameIndex[kindAndName];
        if (!kindNameValue)
            namespace.kindNameIndex[kindAndName] = obj;
        else {
            throw new PreqlError_1.default("f4c7907d-d613-48e7-9e80-37411d2b8e23", `Duplicated name: two objects in namespace '${namespaceName}' of kind `
                + `'${obj.kind}' with same name '${obj.metadata.name}'.`);
        }
        const path = await getPath_1.default(obj);
        if (path) {
            if (path in namespace.pathIndex) {
                const first = namespace.pathIndex[path];
                throw new PreqlError_1.default("c1e2a6ae-119e-47f8-842f-a247f34f75d8", `Conflicting path between ${obj.kind} '${obj.metadata.name}' `
                    + `and ${first.kind} '${first.metadata.name}'. Both have a path of `
                    + `'${path}'.`);
            }
            else {
                namespace.pathIndex[path] = obj;
            }
        }
    }));
    return Promise.resolve(namespaces);
}
exports.default = indexObjects;
//# sourceMappingURL=indexObjects.js.map