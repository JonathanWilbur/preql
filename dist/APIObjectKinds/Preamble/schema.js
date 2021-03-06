"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The JSON schema for the `spec` section of a PreQL `Preamble`.
 *
 * @see /source/APIObjectKinds/Preamble/kind.
 */
const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $async: true,
    title: "PreQL Preamble Specification Schema",
    description: "This gets added to the top of a generated script.",
    type: "object",
    additionalProperties: false,
    properties: {
        uncommentedText: {
            type: "string",
        },
    },
    required: [
        "uncommentedText",
    ],
};
exports.default = schema;
//# sourceMappingURL=schema.js.map