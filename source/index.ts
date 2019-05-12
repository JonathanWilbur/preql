import Ajv = require("ajv");
import * as yaml from "js-yaml";
import { rootSchema } from "./Schema/index";

const ajv: Ajv.Ajv = new Ajv();
const validate = ajv.compile(rootSchema);

export
class PreQLTranspiler {
    public async transpile (dialect: string, rawYaml: string): Promise<string> {
        const doc: any = yaml.safeLoad(rawYaml);
        const valid: boolean = await validate(doc);
        if (!valid) return "No gusta";
        return "We gucci";
    }
}