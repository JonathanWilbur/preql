import { Handler, Context, Callback } from 'aws-lambda';
import validateObject from '../../Commands/validateObject';
import normalizeError from '../../normalizeError';

const handler: Handler = async (event, context: Context, callback: Callback) => {
  if (!(typeof event === 'object')) {
    callback(new Error('Event was not of an object type.'));
    return;
  }
  const body = (() => {
    if (event.body) return JSON.parse(event.body); // AWS HTTP Request
    if (event.apiVersion && event.kind) return event; // Lambda Call
    return undefined;
  })();
  if (!body) {
    callback(new Error('Event was not a recognizable type.'));
    return;
  }
  try {
    callback(null, {
      valid: true,
      specValidated: await validateObject(body),
      validatedObject: body,
    });
  } catch (e) {
    callback(normalizeError(e));
  }
};

export default handler;
