import { Handler, Context, Callback } from 'aws-lambda';
import getServerURI from '../../Commands/getServerURI';
import APIObject from '../../Interfaces/APIObject';
import normalizeError from '../../normalizeError';

const handler: Handler = async (
  event: {
    apiObject: APIObject;
  },
  context: Context,
  callback: Callback<object>,
) => {
  if (!(typeof event === 'object')) callback(new Error('Event was not of an object type.'));
  try {
    callback(null, getServerURI(event.apiObject));
  } catch (e) {
    callback(normalizeError(e));
  }
};

export default handler;
