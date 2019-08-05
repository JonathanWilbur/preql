import { Handler, Context, Callback } from 'aws-lambda';
import validateObject from '../../Commands/validateObject';
import validateNamespace from '../../Commands/validateNamespace';
import indexObjects from '../../Commands/indexObjects';
import getTree from '../../Commands/getTree';
import normalizeError from '../../normalizeError';

const handler: Handler = async (event, context: Context, callback: Callback) => {
  if (!(typeof event === 'object')) {
    callback(new Error('Event was not of an object type.'));
    return;
  }
  const body = (() => {
    if (event.body) return JSON.parse(event.body); // AWS HTTP Request
    if (event.objects) return event; // Lambda Call
    return undefined;
  })();
  if (!body) {
    callback(new Error('Event was not a recognizable type.'));
    return;
  }
  try {
    await Promise.all(body.objects.map(validateObject));
    const namespaces = await indexObjects(body.objects);
    await Promise.all(Object.values(namespaces).map(validateNamespace));
    const tree = await getTree(namespaces);
    callback(null, tree);
  } catch (e) {
    callback(normalizeError(e));
  }
};

export default handler;
