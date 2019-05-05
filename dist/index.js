"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ajv = require("ajv");
const yaml = __importStar(require("js-yaml"));
const index_1 = require("./Schema/index");
const ajv = new Ajv();
const validate = ajv.compile(index_1.rootSchema);
class PreQLTranspiler {
    async transpile(dialect, rawYaml) {
        const doc = yaml.safeLoad(rawYaml);
        const valid = await validate(doc);
        if (!valid)
            return "No gusta";
        return "We gucci";
    }
}
exports.PreQLTranspiler = PreQLTranspiler;
