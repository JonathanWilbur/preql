import { Handler, Context, Callback } from 'aws-lambda';
import getKinds from '../../Commands/getKinds';

const handler: Handler = async (event: {}, context: Context, callback: Callback<object>) => {
  callback(null, getKinds());
};

export default handler;
