"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HandlerEvent_1 = __importDefault(require("./JSONSchema/HandlerEvent"));
// import ConsoleLogger from './Loggers/ConsoleLogger';
const etcd_1 = __importDefault(require("./etcd"));
const APIObjectKinds_1 = __importDefault(require("./APIObjectKinds"));
const Targets_1 = __importDefault(require("./Targets"));
// const logger: ConsoleLogger = new ConsoleLogger();
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const validateHandlerEvent = ajv.compile(HandlerEvent_1.default);
function main(event, callback) {
    // This is done to present residual global state between serverless calls.
    etcd_1.default.present.clear();
    etcd_1.default.absent.clear();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event.ensureTheseThingsArePresent.forEach((apiObject) => {
        // TODO: Validate spec against schema.
        const kind = APIObjectKinds_1.default.get(apiObject.kind.toLowerCase());
        if (!kind) {
            console.warn(`Kind ${apiObject.kind} not recognized.`);
            return;
        }
        kind.validateStructure(apiObject, etcd_1.default);
        if (apiObject.metadata.labels) {
            // eslint-disable-next-line no-param-reassign
            apiObject.metadata.labels = new Map(Object.entries(apiObject.metadata.labels));
        }
        if (apiObject.metadata.annotations) {
            // eslint-disable-next-line no-param-reassign
            apiObject.metadata.annotations = new Map(Object.entries(apiObject.metadata.annotations));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const kindArrayReference = etcd_1.default.present.get(apiObject.kind.toLowerCase());
        if (!kindArrayReference) {
            etcd_1.default.present.set(apiObject.kind.toLowerCase(), [apiObject]);
        }
        else {
            kindArrayReference.push(apiObject);
        }
    });
    const targetTranspiler = Targets_1.default.get(event.transpileTo);
    if (!(targetTranspiler))
        throw new Error(`Target ${event.transpileTo} not understood.`);
    callback(null, { value: targetTranspiler.transpile(etcd_1.default) });
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
