import { Handler, Context, Callback } from 'aws-lambda';
import HandlerEventSchema from './JSONSchema/HandlerEvent';
// import ConsoleLogger from './Loggers/ConsoleLogger';
import etcd from './etcd';
import HandlerEvent from './Interfaces/HandlerEvent';
import APIObject from './Interfaces/APIObject';
import APIObjectKind from './APIObjectKind';
import kinds from './APIObjectKinds';
import targets from './Targets';
import Target from './Target';
// const logger: ConsoleLogger = new ConsoleLogger();
import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});
const validateHandlerEvent = ajv.compile(HandlerEventSchema);

function main(event: HandlerEvent, callback: Callback<object>) {
  // This is done to present residual global state between serverless calls.
  etcd.present.clear();
  etcd.absent.clear();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event.ensureTheseThingsArePresent.forEach((apiObject: APIObject<any>) => {
    // TODO: Validate spec against schema.
    const kind : APIObjectKind | undefined = kinds.get(apiObject.kind.toLowerCase());
    if (!kind) {
      console.warn(`Kind ${apiObject.kind} not recognized.`);
      return;
    }
    kind.validateStructure(apiObject, etcd);

    if (apiObject.metadata.labels) {
      // eslint-disable-next-line no-param-reassign
      apiObject.metadata.labels = new Map(Object.entries(apiObject.metadata.labels));
    }
    if (apiObject.metadata.annotations) {
      // eslint-disable-next-line no-param-reassign
      apiObject.metadata.annotations = new Map(Object.entries(apiObject.metadata.annotations));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kindArrayReference : APIObject<any>[] | undefined = etcd.present.get(apiObject.kind.toLowerCase());
    if (!kindArrayReference) {
      etcd.present.set(apiObject.kind.toLowerCase(), [apiObject]);
    } else {
      kindArrayReference.push(apiObject);
    }
  });

  const targetTranspiler: Target | undefined = targets.get(event.transpileTo);
  if (!(targetTranspiler)) throw new Error(`Target ${event.transpileTo} not understood.`);
  callback(null, { value: targetTranspiler.transpile(etcd) });
}

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
  main(event, callback);
};

export default handler;
