import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import schema from './schema';
import Spec from './spec';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import AttributeSpec from '../Attribute/spec';
import DataTypeSpec from '../DataType/spec';
import PreqlError from '../../PreqlError';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

// TODO: Note the limitations of this: that it cannot perfectly check that the data type will insert.
const kind: APIObjectKind = {
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    const structAttributes: Record<string, APIObject<AttributeSpec>> = {};
    etcd.kindIndex.attribute
      .filter((attr: APIObject<AttributeSpec>): boolean => (
        attr.spec.databaseName === apiObject.spec.databaseName
        && attr.spec.structName === apiObject.spec.structName
      ))
      .forEach((attr: APIObject<AttributeSpec>): void => {
        structAttributes[attr.spec.name] = attr;
      });

    Object.keys(apiObject.spec.values).forEach((key: string): void => {
      // Check that an attribute with that name exists.
      const matchingAttribute: APIObject<AttributeSpec> = structAttributes[key];
      if (!matchingAttribute) {
        throw new PreqlError(
          'a16cfa1b-e48b-4911-b918-92861a241d7b',
          `Attribute '${key}' does not exist on Struct '${apiObject.spec.structName}' `
          + `for Entry '${apiObject.metadata.name}' to populate.`,
        );
      }

      // Check that the attribute's data type is compatible with the Entry's attribute's type.
      const kindNameKey: string = `datatype:${matchingAttribute.spec.type}`;
      const datatype: APIObject<DataTypeSpec> | undefined = etcd.kindNameIndex[kindNameKey];
      if (!datatype) {
        // This error should never occur.
        throw new PreqlError(
          '8f5ddbcc-2740-4617-985a-fa2ce339bef8',
          `Unrecognized data type '${matchingAttribute.spec.type}'.`,
        );
      }
      const valueType: string = typeof apiObject.spec.values[key];
      const attributeJSONType: string = datatype.spec.jsonEquivalent.toLowerCase();
      if (attributeJSONType === 'integer') {
        if (valueType !== 'number') {
          throw new Error(
            `Type used in Attribute '${key}' in Entry '${apiObject.metadata.name}' `
            + 'is not an integer, which is the legitimate type of that attribute.',
          );
        }
        if (!(Number.isSafeInteger(apiObject.spec.values[key] as number))) {
          throw new PreqlError(
            '2a22429e-8bd4-4f06-b01d-c114581fc922',
            `Number used in Attribute '${key}' in Entry '${apiObject.metadata.name}' `
            + 'is either too big or small to be safely used as an integer.',
          );
        }
      } else if (valueType !== attributeJSONType) {
        throw new PreqlError(
          'd8da9998-6f93-406b-a900-a52e51ad7431',
          `Type '${valueType}' used in Attribute '${key}' in Entry `
          + `'${apiObject.metadata.name}' is not compatible with the `
          + `legitimate type of that Attribute, which is a(n) '${datatype.metadata.name}'.`,
        );
      }

      // Check regexes
      if (valueType === 'string' && datatype.spec.regexes && datatype.spec.regexes.pcre) {
        const match: boolean = Object.entries(datatype.spec.regexes.pcre)
          .some((group): boolean => {
            if (!datatype.spec.regexes) return false;
            return Object.entries(datatype.spec.regexes.pcre[group[0]])
              .every((re): boolean => {
                const regex: RegExp = new RegExp(re[1].pattern); // TODO: Support flags / Unicode?
                if (re[1].positive) { // Make sure it matches.
                  return regex.test(apiObject.spec.values[key] as string);
                }
                // Or, make sure it doesn't match.
                return !regex.test(apiObject.spec.values[key] as string);
              });
          });
        if (!match) {
          throw new PreqlError(
            'db04d1b5-88a5-47fe-8b37-2b11d26a149c',
            `None of the regular expressions for data type '${datatype.metadata.name}' `
            + `matched the value of '${key}' for Entry '${apiObject.metadata.name}'.`,
          );
        }
      }

      // Check minimums and maximums
      if (valueType === 'number') {
        if (datatype.spec.minimum && apiObject.spec.values[key] < datatype.spec.minimum) {
          throw new PreqlError(
            'b9d92500-6ac6-4a4f-80d6-dc63de8a1643',
            `Value of '${key}' for Entry '${apiObject.metadata.name}' was `
            + `${apiObject.spec.values[key]}, but the permissible minimum for `
            + `the data type '${datatype.metadata.name}' is ${datatype.spec.minimum}.`,
          );
        }
        if (datatype.spec.maximum && apiObject.spec.values[key] > datatype.spec.maximum) {
          throw new PreqlError(
            '15327242-05eb-4cd0-ab78-47f2525bc5b8',
            `Value of '${key}' for Entry '${apiObject.metadata.name}' was `
            + `${apiObject.spec.values[key]}, but the permissible maximum for `
            + `the data type '${datatype.metadata.name}' is ${datatype.spec.maximum}.`,
          );
        }
      }
    });

    Object.values(structAttributes)
      .forEach((attr: APIObject<AttributeSpec>): void => {
        if (!(attr.spec.nullable) && !(attr.spec.name in apiObject.spec.values)) {
          throw new PreqlError(
            '390b1998-90a7-487d-9145-2a2b5e2c123f',
            `Attribute '${attr.spec.name}' in Struct '${attr.spec.databaseName}'.`
            + `'${attr.spec.structName}' cannot be null for entry '${apiObject.metadata.name}'.`,
          );
        }
      });
  },
};

export default kind;
