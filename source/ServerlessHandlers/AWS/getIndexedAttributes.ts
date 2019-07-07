import { Handler, Context, Callback } from 'aws-lambda';
import validateObject from '../../Commands/validateObject';
import validateNamespace from '../../Commands/validateNamespace';
import indexObjects from '../../Commands/indexObjects';
import getIndexedAttributes from '../../Commands/getIndexedAttributes';
import APIObject from '../../Interfaces/APIObject';
import normalizeError from '../../normalizeError';

const handler: Handler<{ objects: APIObject[] }> = async (
  event: { objects: APIObject[], namespace?: string },
  context: Context,
  callback: Callback,
) => {
  if (!(typeof event === 'object')) callback(new Error('Event was not of an object type.'));
  if (!event.objects) callback(new Error('Event was supposed to have an `objects` field.'));
  try {
    await Promise.all(event.objects.map(validateObject));
    const namespaces = await indexObjects(event.objects);
    await Promise.all(Object.values(namespaces).map(validateNamespace));
    const entries = await getIndexedAttributes(namespaces[event.namespace || 'default']);
    callback(null, entries);
  } catch (e) {
    callback(normalizeError(e));
  }
};

export default handler;
