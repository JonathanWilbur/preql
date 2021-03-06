import ajvOptions from "./ajvOptions";

import Ajv = require("ajv");

const ajv: Ajv.Ajv = new Ajv(ajvOptions);
ajv.addKeyword("unicodePattern", {
    validate: (schema: any, data: any): boolean => (
        (typeof schema === "string" && typeof data === "string")
            ? (new RegExp(schema, "u")).test(data) : false
    ),
    async: true,
    errors: false,
});

export default ajv;
