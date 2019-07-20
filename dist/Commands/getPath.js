"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getPath(obj) {
    if (!obj || !obj.spec || typeof obj.spec !== 'object')
        return undefined;
    if (!('name' in obj.spec) || typeof obj.spec.name !== 'string')
        return undefined;
    if (!('databaseName' in obj.spec) || typeof obj.spec.databaseName !== 'string')
        return undefined;
    let path = obj.spec.databaseName.toLowerCase();
    if ('structName' in obj.spec && typeof obj.spec.structName === 'string') {
        path += `.${obj.spec.structName.toLowerCase()}`;
    }
    else if ('childStructName' in obj.spec && typeof obj.spec.childStructName === 'string') {
        path += `.${obj.spec.childStructName.toLowerCase()}`;
    }
    path += `.${obj.spec.name.toLowerCase()}`;
    return path;
}
exports.default = getPath;
;
