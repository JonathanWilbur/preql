import { Handler } from 'aws-lambda';
import APIObject from '../../Interfaces/APIObject';
declare const handler: Handler<{
    objects: APIObject[];
}>;
export default handler;
