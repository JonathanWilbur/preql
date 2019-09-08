import APIObject from '../Interfaces/APIObject';
import Spec from '../APIObjectKinds/Server/spec';
import schema from '../APIObjectKinds/Server/schema';
import ajv from '../ajv';
import PreqlError from '../PreqlError';

const structureValidator = ajv.compile(schema);

/**
 * Generates a URI, given a Server API Object. The URI will be a connection URI
 * for that database server.
 *
 * @param obj The object from whence to create the URI.
 */
export default
async function getServerURI(obj: APIObject<Spec>): Promise<{ uri: string }> {
  try {
    await structureValidator(obj);
  } catch (e) {
    throw new PreqlError(
      '87e35ffb-4a27-467b-91df-1f1201638484',
      `${obj.kind} '${obj.metadata.name}' failed structural `
      + `validation. ${e.message} ${e.errors || ''}`,
    );
  }
  let uri: string = `${obj.spec.protocol}://${obj.spec.hostname}`;
  uri += obj.spec.port ? `:${obj.spec.port}` : '';
  return {
    uri,
  };
};
