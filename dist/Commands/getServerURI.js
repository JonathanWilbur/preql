"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../APIObjectKinds/Server/schema"));
const Ajv = require("ajv");
const ajv = new Ajv({
    useDefaults: true,
});
const structureValidator = ajv.compile(schema_1.default);
/**
 * Generates a URI, given a Server API Object. The URI will be a connection URI
 * for that database server.
 *
 * @param apiObject The object from whence to create the URI.
 */
async function getServerURI(apiObject) {
    // TODO: Move this out of here.
    await structureValidator(apiObject);
    let uri = `${apiObject.spec.protocol}://${apiObject.spec.hostname}`;
    uri += apiObject.spec.port ? `:${apiObject.spec.port}` : '';
    uri += apiObject.spec.defaultDatabase ? `/${apiObject.spec.defaultDatabase}` : '';
    return {
        uri,
    };
}
exports.default = getServerURI;
;
