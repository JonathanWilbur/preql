"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("../../ajv"));
const schema_1 = __importDefault(require("../../APIObjectKinds/Server/schema"));
const getServerURI_1 = __importDefault(require("../../Commands/getServerURI"));
const normalizeError_1 = __importDefault(require("../../normalizeError"));
const PreqlError_1 = __importDefault(require("../../PreqlError"));
const structureValidator = ajv_1.default.compile(schema_1.default);
const handler = async (event, context, callback) => {
    if (!(typeof event === "object")) {
        callback(new Error("Event was not of an object type."));
        return;
    }
    const body = (() => {
        if (event.body)
            return JSON.parse(event.body); // AWS HTTP Request
        if (event.apiObject)
            return event; // Lambda Call
        return undefined;
    })();
    if (!body) {
        callback(new Error("Event was not a recognizable type."));
        return;
    }
    try {
        await structureValidator(body.apiObject.spec);
    }
    catch (e) {
        throw new PreqlError_1.default("87e35ffb-4a27-467b-91df-1f1201638484", `${body.apiObject.kind} '${body.apiObject.metadata.name}' failed structural `
            + `validation. ${e.message} ${(e.errors || []).map((x) => x.message).join("; ")}`);
    }
    try {
        callback(null, await getServerURI_1.default(body.apiObject));
    }
    catch (e) {
        callback(normalizeError_1.default(e));
    }
};
exports.default = handler;
//# sourceMappingURL=getServerURI.js.map