"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../APIObjectKinds/Server/schema"));
const ajv_1 = __importDefault(require("../ajv"));
const PreqlError_1 = __importDefault(require("../PreqlError"));
const structureValidator = ajv_1.default.compile(schema_1.default);
/**
 * Generates a URI, given a Server API Object. The URI will be a connection URI
 * for that database server.
 *
 * @param apiObject The object from whence to create the URI.
 */
async function getServerURI(apiObject) {
    try {
        await structureValidator(apiObject);
    }
    catch (e) {
        throw new PreqlError_1.default('87e35ffb-4a27-467b-91df-1f1201638484', `${apiObject.kind} '${apiObject.metadata.name}' failed structural `
            + `validation. ${e.message} ${e.errors || ''}`);
    }
    let uri = `${apiObject.spec.protocol}://${apiObject.spec.hostname}`;
    uri += apiObject.spec.port ? `:${apiObject.spec.port}` : '';
    return {
        uri,
    };
}
exports.default = getServerURI;
;
