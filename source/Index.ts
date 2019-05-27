import { Handler, Context, Callback } from 'aws-lambda';
import HandlerEventSchema from './JSONSchema/HandlerEvent';
import HandlerEvent from './Interfaces/HandlerEvent';
import APIObject from './Interfaces/APIObject';
import APIObjectKind from './APIObjectKind';
import kinds from './APIObjectKinds';
import targets from './Targets';
import Target from './Target';
import logger from './Loggers/ConsoleLogger';
import APIObjectDatabase from './Interfaces/APIObjectDatabase';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});
const validateHandlerEvent = ajv.compile(HandlerEventSchema);

function main(event: HandlerEvent, callback: Callback<object>) {
  /**
   * This is named after etcd, which is the database that Kubernetes uses to
   * store configuration and state information. This etcd serves a similar
   * purpose without being a full-blown database. It could have been an array,
   * but I went with a Map so that objects could be quickly filtered by kind.
   * That said, the key of the etcd map is the kind, and the value is an array
   * of API objects of that kind.
   *
   * This is not pre-populated with keys from all recognized kinds as of now.
   * Care should be taken by developer to ensure that the key exists before
   * attempting to read its value, and care should be taken to ensure that
   * the key is created upon writing if it does not exist.
   */
  const etcd: APIObjectDatabase = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    absent: new Map<string, APIObject<any>[]>([]),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    present: new Map<string, APIObject<any>[]>([]),
  };

  // This is done to present residual global state between serverless calls.
  // etcd.present.clear();
  // etcd.absent.clear();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event.ensureTheseThingsArePresent.forEach((apiObject: APIObject<any>) => {
    // TODO: Validate spec against schema.
    const kind : APIObjectKind | undefined = kinds.get(apiObject.kind.toLowerCase());
    if (!kind) {
      logger.warn([], `Kind ${apiObject.kind} not recognized.`);
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
