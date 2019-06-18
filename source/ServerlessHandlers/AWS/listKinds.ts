import { Handler, Context, Callback } from 'aws-lambda';
import kinds from '../../APIObjectKinds/index';
import normalizeError from '../../normalizeError';

const handler: Handler<{}> = async (
  event: {},
  context: Context,
  callback: Callback<object>,
) => {
  // REVIEW: Handle JSON and YAML strings, too?
  if (!(typeof event === 'object')) callback(new Error('Event was not of an object type.'));
  try {
    callback(null, {
      kinds: Object.keys(kinds),
    });
  } catch (e) {
    callback(normalizeError(e));
  }
};

export default handler;
