import { Handler, Context, Callback } from 'aws-lambda';
import indexObjects from '../../Commands/indexObjects';
import APIObject from '../../Interfaces/APIObject';
import normalizeError from '../../normalizeError';

const handler: Handler<{ objects: APIObject[] }> = async (
  event: { objects: APIObject[] },
  context: Context,
  callback: Callback<object>,
) => {
  // REVIEW: Handle JSON and YAML strings, too?
  if (!(typeof event === 'object')) callback(new Error('Event was not of an object type.'));
  if (!event.objects) callback(new Error('Event was supposed to have an `objects` field.'));
  if (typeof event.objects !== 'object') callback(new Error('Event.objects should have been an array.'));
  try {
    const namespaces = await indexObjects(event.objects);
    // See: https://stackoverflow.com/questions/44740423/create-json-string-from-js-map-and-string
    callback(null, {
      namespaces,
      numberOfObjects: event.objects.length,
    });
  } catch (e) {
    callback(normalizeError(e));
  }
};

export default handler;
