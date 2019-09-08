import APIObject from "../Interfaces/APIObject";
import Spec from "../APIObjectKinds/Server/spec";
/**
 * Generates a URI, given a Server API Object. The URI will be a connection URI
 * for that database server.
 *
 * @param obj The object from whence to create the URI.
 */
export default function getServerURI(obj: APIObject<Spec>): Promise<{
    uri: string;
}>;
//# sourceMappingURL=getServerURI.d.ts.map