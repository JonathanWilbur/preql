export default
// eslint-disable-next-line
function normalizeError(err: any): Error {

  // See: https://github.com/serverless/serverless/issues/6267
  if (!('stack' in err)) {
    // eslint-disable-next-line no-param-reassign
    err.stack = '';
  }

  // This is to make Ajv.ValidationError print errors in errorMessage when using Serverless Framework.
  if (
    'message' in err
    && 'errors' in err
    && typeof err.errors === 'object'
    && Array.isArray(err.errors)
  ) {
    // eslint-disable-next-line
    err.message += `: ${(err.errors as object[]).map((e: any): string => {
      if ('message' in e) return e.message;
      return '';
    }).join(', ')}`;
  }

  return err;
};
