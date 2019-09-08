"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normalizeError(err) {
    // See: https://github.com/serverless/serverless/issues/6267
    if (!("stack" in err)) {
        // eslint-disable-next-line no-param-reassign
        err.stack = "";
    }
    // This is to make Ajv.ValidationError print errors in errorMessage when using Serverless Framework.
    if ("message" in err
        && "errors" in err
        && typeof err.errors === "object"
        && Array.isArray(err.errors)) {
        // eslint-disable-next-line
        err.message += `: ${err.errors.map((e) => {
            if ("message" in e)
                return e.message;
            return "";
        }).join(", ")}`;
    }
    return err;
}
exports.default = normalizeError;
//# sourceMappingURL=normalizeError.js.map