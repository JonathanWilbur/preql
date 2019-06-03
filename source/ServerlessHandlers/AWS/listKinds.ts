import { Handler, Context, Callback } from 'aws-lambda';
import kinds from '../../APIObjectKinds/index';

const handler: Handler<{}> = async (
  event: {},
  context: Context,
  callback: Callback<object>,
) => {
  // REVIEW: Handle JSON and YAML strings, too?
  if (!(typeof event === 'object')) callback(new Error('Event was not of an object type.'));
  try {
    callback(null, {
      kinds: Array.from(kinds.keys()),
    });
  } catch (e) {
    callback(e);
  }
};

export default handler;
