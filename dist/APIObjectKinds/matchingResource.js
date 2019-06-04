"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function matchingResource(name, kind, etcd) {
    const matchingResources = etcd.kindIndex[kind.toLowerCase()];
    if (!matchingResources)
        return false;
    return matchingResources.some((database) => database.spec.name === name);
}
exports.default = matchingResource;
;
