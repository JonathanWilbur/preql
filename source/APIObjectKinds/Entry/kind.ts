import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import schema from './schema';
import Spec from './spec';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import AttributeSpec from '../Attribute/spec';
import DataTypeSpec from '../DataType/spec';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

// TODO: Note the limitations of this: that it cannot perfectly check that the data type will insert.
const kind: APIObjectKind = {
  name: 'Entry',
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
        throw new Error(
          `Attribute '${key}' does not exist on struct '${apiObject.spec.structName}' `
          + `for Entry '${apiObject.metadata.name}' to populate.`,
        )
      }

      // Check that the attribute's data type is compatible with the Entry's attribute's type.
      const kindNameKey: string = `datatype:${matchingAttribute.spec.type}`;
      const datatype: APIObject<DataTypeSpec> | undefined = etcd.kindNameIndex[kindNameKey];
      if (!datatype) {
        // This error should never occur.
        throw new Error(`Unrecognized data type '${matchingAttribute.spec.type}'.`);
      }
      const valueType: string = typeof apiObject.spec.values[key];
      const attributeJSONType: string = datatype.spec.jsonEquivalent.toLowerCase();
      if (attributeJSONType === 'integer') {
        if (valueType !== 'number') {
          throw new Error(
            `Type used in attribute '${key}' in entry '${apiObject.metadata.name}' `
            + 'is not an integer, which is the legitimate type of that attribute.',
          );
        }
        if (!(Number.isSafeInteger(apiObject.spec.values[key] as number))) {
          throw new Error(
            `Number used in attribute '${key}' in entry '${apiObject.metadata.name}' `
            + 'is either too big or small to be safely used as an integer.',
          );
        }
      } else if (valueType !== attributeJSONType) {
        throw new Error(
          `Type '${valueType}' used in attribute '${key}' in entry `
          + `'${apiObject.metadata.name}' is not compatible with the `
          + `legitimate type of that attribute, which is a(n) '${datatype.metadata.name}'.`,
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
          throw new Error(
            `None of the regular expressions for data type '${datatype.metadata.name}' `
            + `matched the value of '${key}' for entry '${apiObject.metadata.name}'.`,
          );
        }
      }

      // Check minimums and maximums
      if (valueType === 'number') {
        if (datatype.spec.minimum && apiObject.spec.values[key] < datatype.spec.minimum) {
          throw new Error(
            `Value of '${key}' for entry '${apiObject.metadata.name}' was `
            + `${apiObject.spec.values[key]}, but the permissible minimum for `
            + `the data type '${datatype.metadata.name}' is ${datatype.spec.minimum}.`,
          );
        }
        if (datatype.spec.maximum && apiObject.spec.values[key] > datatype.spec.maximum) {
          throw new Error(
            `Value of '${key}' for entry '${apiObject.metadata.name}' was `
            + `${apiObject.spec.values[key]}, but the permissible maximum for `
            + `the data type '${datatype.metadata.name}' is ${datatype.spec.maximum}.`,
          );
        }
      }
    });

    Object.values(structAttributes)
      .forEach((attr: APIObject<AttributeSpec>): void => {
        if (!(attr.spec.nullable) && !(attr.spec.name in apiObject.spec.values)) {
          throw new Error(
            `Attribute '${attr.spec.name}' in struct '${attr.spec.databaseName}'.`
            + `'${attr.spec.structName}' cannot be null for entry '${apiObject.metadata.name}'.`,
          );
        }
      });
  },
};

export default kind;
