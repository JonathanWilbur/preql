import { Handler, Context, Callback } from 'aws-lambda';
import validateObject from '../../Commands/validateObject';
import validateNamespace from '../../Commands/validateNamespace';
import indexObjects from '../../Commands/indexObjects';
import getTree from '../../Commands/getTree';
import APIObject from '../../Interfaces/APIObject';

const handler: Handler<{ objects: APIObject[] }> = async (
  event: { objects: APIObject[] },
  context: Context,
  callback: Callback<object>,
) => {
  // REVIEW: Handle JSON and YAML strings, too?
  if (!(typeof event === 'object')) callback(new Error('Event was not of an object type.'));
  if (!event.objects) callback(new Error('Event was supposed to have an `objects` field.'));
  try {
    await Promise.all(event.objects.map(validateObject));
    const namespaces = await indexObjects(event.objects);
    await Promise.all(Object.values(namespaces).map(validateNamespace));
    const tree = await getTree(namespaces);
    callback(null, tree);
  } catch (e) {
    callback(e);
  }
};

export default handler;
