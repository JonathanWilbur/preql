import Spec from "../APIObjectKinds/Server/spec";
import APIObject from "../Interfaces/APIObject";

/**
 * Generates a URI, given a Server API Object. The URI will be a connection URI
 * for that database server.
 *
 * @param obj {APIObject} The object from whence to create the URI.
 * @returns {object} An object whose `uri` field is a string containing the URI of the server.
 */
export default
async function getServerURI (obj: APIObject<Spec>): Promise<{ uri: string }> {
    let uri: string = `${obj.spec.protocol}://${obj.spec.hostname}`;
    uri += obj.spec.port ? `:${obj.spec.port}` : "";
    return {
        uri,
    };
}
