import { Handler, Context, Callback } from 'aws-lambda';
import getPath from '../../Commands/getPath';
import APIObject from '../../Interfaces/APIObject';

const handler: Handler = async (event: APIObject, context: Context, callback: Callback) => {
  if (!(typeof event === 'object')) callback(new Error('Event was not of an object type.'));
  callback(null, { path: await getPath(event) });
};

export default handler;
