/**
 * This function exists to solve two problems:
 *
 * 1. In older versions of Serverless, Serverless crashes when it encounters
 *    an unusually structured `Error` type. See
 *    [the issue](https://github.com/serverless/serverless/issues/6267).
 * 2. The `Ajv` library, which is used for JSON validation, throws unusually
 *    structured errors with a non-descriptive `message`, but with a more
 *    descriptive `errors` array of error-like objects. This function appends
 *    the error messages from this array of errors to the end of the `message`
 *    field.
 * @param err The error to be normalized.
 */
export default
function normalizeError (err: any): Error {
    // See: https://github.com/serverless/serverless/issues/6267
    if (!("stack" in err)) {
        // eslint-disable-next-line no-param-reassign
        err.stack = "";
    }

    /*
        This is to make Ajv.ValidationError print errors in errorMessage when
        using Serverless Framework.
    */
    if (
        "message" in err
        && "errors" in err
        && typeof err.errors === "object"
        && Array.isArray(err.errors)
    ) {
        err.message += `: ${(err.errors as object[]).map((e: any): string => {
            if ("message" in e) return e.message;
            return "";
        }).join(", ")}`;
    }

    return err;
}
