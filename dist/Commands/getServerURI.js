"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generates a URI, given a Server API Object. The URI will be a connection URI
 * for that database server.
 *
 * @param obj The object from whence to create the URI.
 */
async function getServerURI(obj) {
    let uri = `${obj.spec.protocol}://${obj.spec.hostname}`;
    uri += obj.spec.port ? `:${obj.spec.port}` : "";
    return {
        uri,
    };
}
exports.default = getServerURI;
//# sourceMappingURL=getServerURI.js.map