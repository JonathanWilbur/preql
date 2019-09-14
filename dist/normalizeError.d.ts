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
 *
 * @param err {Error} The error to be normalized.
 * @returns {Error} The modified error.
 */
export default function normalizeError(err: any): Error;
//# sourceMappingURL=normalizeError.d.ts.map