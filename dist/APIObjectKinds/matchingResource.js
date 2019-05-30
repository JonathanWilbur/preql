"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function matchingResource(name, kind, etcd) {
    // eslint-disable-next-line
    const matchingResources = etcd.kindIndex.get(kind.toLowerCase());
    if (!matchingResources)
        return false;
    // eslint-disable-next-line
    return matchingResources.some((database) => database.spec.name === name);
}
exports.default = matchingResource;
;
