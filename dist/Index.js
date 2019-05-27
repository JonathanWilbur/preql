"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HandlerEvent_1 = __importDefault(require("./JSONSchema/HandlerEvent"));
const APIObjectKinds_1 = __importDefault(require("./APIObjectKinds"));
const Targets_1 = __importDefault(require("./Targets"));
const ConsoleLogger_1 = __importDefault(require("./Loggers/ConsoleLogger"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const validateHandlerEvent = ajv.compile(HandlerEvent_1.default);
function main(event, callback) {
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
    const etcd = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        absent: new Map([]),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        present: new Map([]),
    };
    // This is done to present residual global state between serverless calls.
    // etcd.present.clear();
    // etcd.absent.clear();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event.ensureTheseThingsArePresent.forEach((apiObject) => {
        // TODO: Validate spec against schema.
        const kind = APIObjectKinds_1.default.get(apiObject.kind.toLowerCase());
        if (!kind) {
            ConsoleLogger_1.default.warn([], `Kind ${apiObject.kind} not recognized.`);
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
        const kindArrayReference = etcd.present.get(apiObject.kind.toLowerCase());
        if (!kindArrayReference) {
            etcd.present.set(apiObject.kind.toLowerCase(), [apiObject]);
        }
        else {
            kindArrayReference.push(apiObject);
        }
    });
    const targetTranspiler = Targets_1.default.get(event.transpileTo);
    if (!(targetTranspiler))
        throw new Error(`Target ${event.transpileTo} not understood.`);
    callback(null, { value: targetTranspiler.transpile(etcd) });
}
const handler = (event, context, callback) => {
    // REVIEW: Handle JSON and YAML strings, too?
    if (!(typeof event === 'object'))
        callback(new Error('Event was not of an object type.'));
    const valid = validateHandlerEvent(event);
    if (!valid) {
        callback(new Error('Input PreQL was invalid. Errors: '
            + `${(validateHandlerEvent.errors || []).map(e => e.message).join('\r\n')}`));
        return;
    }
    main(event, callback);
};
exports.default = handler;
