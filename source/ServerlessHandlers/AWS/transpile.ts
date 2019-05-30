import { Handler, Context, Callback } from 'aws-lambda';
import HandlerEventSchema from '../../JSONSchema/HandlerEvent';
import HandlerEvent from '../../Interfaces/HandlerEvent';
import transpile from '../../Commands/transpile';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});
const validateHandlerEvent = ajv.compile(HandlerEventSchema);

const handler: Handler<HandlerEvent, object> = (
  event: HandlerEvent,
  context: Context,
  callback: Callback<object>,
): void => {
  // REVIEW: Handle JSON and YAML strings, too?
  if (!(typeof event === 'object')) callback(new Error('Event was not of an object type.'));
  const valid: boolean = validateHandlerEvent(event) as boolean;
  if (!valid) {
    callback(new Error(
      'Input PreQL was invalid. Errors: '
      + `${(validateHandlerEvent.errors || []).map(e => e.message).join('\r\n')}`,
    ));
    return;
  }
  transpile(event.namespace || 'default', event.transpileTo, event.objects)
    .then((result): void => {
      callback(null, result);
    });
};

export default handler;
