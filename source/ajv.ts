import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});
ajv.addKeyword('unicodePattern', {
  // eslint-disable-next-line
  validate: (schema: any, data: any): boolean => (
    typeof schema === 'string' && typeof data === 'string'
      ? (new RegExp(schema, 'u')).test(data) : false
  ),
  async: true,
  errors: false,
});

export default ajv;
