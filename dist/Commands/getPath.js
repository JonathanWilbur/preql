"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getPath(obj) {
    let path;
    if (!obj || !obj.spec || typeof obj.spec !== 'object')
        return undefined;
    if ('databaseName' in obj.spec && typeof obj.spec.databaseName === 'string') {
        path = obj.spec.databaseName;
    }
    else {
        return undefined;
    }
    if ('structName' in obj.spec && typeof obj.spec.structName === 'string') {
        path += `.${obj.spec.structName}`;
    }
    if ('name' in obj.spec && typeof obj.spec.name === 'string') {
        path += `.${obj.spec.name}`;
    }
    return path;
}
exports.default = getPath;
;
