import { Handler, Context, Callback } from 'aws-lambda';
import validateObject from '../../Commands/validateObject';
import APIObject from '../../Interfaces/APIObject';
import normalizeError from '../../normalizeError';

const handler: Handler<APIObject> = async (
  event: APIObject,
  context: Context,
  callback: Callback<object>,
) => {
  if (!(typeof event === 'object')) callback(new Error('Event was not of an object type.'));
  try {
    callback(null, {
      valid: true,
      specValidated: await validateObject(event),
      validatedObject: event,
    });
  } catch (e) {
    callback(normalizeError(e));
  }
};

export default handler;
