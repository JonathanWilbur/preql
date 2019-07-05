import APIObject from '../Interfaces/APIObject';
import Spec from '../APIObjectKinds/Server/spec';
import schema from '../APIObjectKinds/Server/schema';
import ajv from '../ajv';

const structureValidator = ajv.compile(schema);

/**
 * Generates a URI, given a Server API Object. The URI will be a connection URI
 * for that database server.
 *
 * @param apiObject The object from whence to create the URI.
 */
export default
async function getServerURI(apiObject: APIObject<Spec>): Promise<{ uri: string }> {
  await structureValidator(apiObject);
  let uri: string = `${apiObject.spec.protocol}://${apiObject.spec.hostname}`;
  uri += apiObject.spec.port ? `:${apiObject.spec.port}` : '';
  return {
    uri,
  };
};
