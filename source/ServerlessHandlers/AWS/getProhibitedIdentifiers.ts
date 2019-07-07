import { Handler, Context, Callback } from 'aws-lambda';
import getProhibitedIdentifiers from '../../Commands/getProhibitedIdentifiers';

const handler: Handler = async (event: {}, context: Context, callback: Callback<object>) => {
  callback(null, getProhibitedIdentifiers());
};

export default handler;
