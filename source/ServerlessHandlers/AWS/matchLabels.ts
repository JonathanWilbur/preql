import { Handler, Context, Callback } from 'aws-lambda';
import matchLabels from '../../Commands/matchLabels';
import APIObject from '../../Interfaces/APIObject';

const handler: Handler = async (
  event: {
    labels: {
      [name: string]: string;
    };
    apiObject: APIObject;
  },
  context: Context,
  callback: Callback<object>,
) => {
  // REVIEW: Handle JSON and YAML strings, too?
  if (!(typeof event === 'object')) callback(new Error('Event was not of an object type.'));
  try {
    callback(null, matchLabels(event.labels, event.apiObject));
  } catch (e) {
    callback(e);
  }
};

export default handler;
