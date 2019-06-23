import { Handler, Context, Callback } from 'aws-lambda';
import matchLabels from '../../Commands/matchLabels';
import APIObject from '../../Interfaces/APIObject';
import normalizeError from '../../normalizeError';

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
  if (!(typeof event === 'object')) callback(new Error('Event was not of an object type.'));
  try {
    callback(null, matchLabels(event.labels, event.apiObject));
  } catch (e) {
    callback(normalizeError(e));
  }
};

export default handler;
