import Spec from "../APIObjectKinds/Server/spec";
import APIObject from "../Interfaces/APIObject";

/**
 * Generates a URI, given a Server API Object. The URI will be a connection URI
 * for that database server.
 *
 * @param obj The object from whence to create the URI.
 */
export default
async function getServerURI (obj: APIObject<Spec>): Promise<{ uri: string }> {
    let uri: string = `${obj.spec.protocol}://${obj.spec.hostname}`;
    uri += obj.spec.port ? `:${obj.spec.port}` : "";
    return {
        uri,
    };
}
