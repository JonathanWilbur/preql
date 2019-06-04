import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../APIObjectKind';
import schema from './schema';
import Spec from './spec';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import matchingResource from '../matchingResource';
import AttributeSpec from '../Attribute/spec';

import Ajv = require('ajv');
const ajv: Ajv.Ajv = new Ajv({
  useDefaults: true,
});

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  name: 'ForeignKeyConstraint',
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new Error(
        `No databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!matchingResource(apiObject.spec.child.struct, 'struct', etcd)) {
      throw new Error(
        `No structs found that are named '${apiObject.spec.child.struct}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!matchingResource(apiObject.spec.parent.struct, 'struct', etcd)) {
      throw new Error(
        `No structs found that are named '${apiObject.spec.parent.struct}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }

    if (apiObject.spec.child.key.length !== apiObject.spec.parent.key.length) {
      throw new Error(
        `Number of key attributes in child struct '${apiObject.spec.child.struct}' `
        + 'does not match the number of key attributes in the parent struct '
        + `'${apiObject.spec.parent.struct}' for the ForeignKeyConstraint named `
        + `'${apiObject.metadata.name}'.`,
      )
    }

    const columns: APIObject<AttributeSpec>[] | undefined = etcd.kindIndex.attribute;
    if (!columns || columns.length === 0) {
      throw new Error(
        `No attributes found for ${apiObject.kind} '${apiObject.metadata.name}' `
        + 'to use as keys.',
      );
    }

    const childStructAttributes: Record<string, APIObject<AttributeSpec>> = {};
    columns
      .filter((attr: APIObject<AttributeSpec>): boolean => (
        attr.spec.structName.toLowerCase() === apiObject.spec.child.struct.toLowerCase()
        && attr.spec.databaseName.toLowerCase() === apiObject.spec.databaseName.toLowerCase()
      ))
      .forEach((attr: APIObject<AttributeSpec>): void => {
        childStructAttributes[attr.spec.name.toLowerCase()] = attr;
      });

    const parentStructAttributes: Record<string, APIObject<AttributeSpec>> = {};
    columns
      .filter((attr: APIObject<AttributeSpec>): boolean => (
        attr.spec.structName.toLowerCase() === apiObject.spec.parent.struct.toLowerCase()
        && attr.spec.databaseName.toLowerCase() === apiObject.spec.databaseName.toLowerCase()
      ))
      .forEach((attr: APIObject<AttributeSpec>): void => {
        parentStructAttributes[attr.spec.name.toLowerCase()] = attr;
      });

    apiObject.spec.child.key.forEach((key: { columnName: string }): void => {
      if (!(key.columnName.toLowerCase() in childStructAttributes)) {
        throw new Error(
          `Child struct '${apiObject.spec.child.struct}' has no column named `
          + `'${key.columnName}' to which ForeignKeyConstraint `
          + `'${apiObject.metadata.name}' can apply.`,
        );
      }
    });

    apiObject.spec.parent.key.forEach((key: { columnName: string }): void => {
      if (!(key.columnName.toLowerCase() in parentStructAttributes)) {
        throw new Error(
          `Parent struct '${apiObject.spec.parent.struct}' has no column named `
          + `'${key.columnName}' to which ForeignKeyConstraint `
          + `'${apiObject.metadata.name}' can apply.`,
        );
      }
    });

    // Note that nullability should not factor into the FKC.
    apiObject.spec.child.key.forEach((key: { columnName: string }, index: number): void => {
      const childAttributeName: string = key.columnName.toLowerCase();
      const childAttribute: APIObject<AttributeSpec> | undefined = childStructAttributes[childAttributeName];
      const parentAttributeName: string = apiObject.spec.parent.key[index].columnName.toLowerCase();
      const parentAttribute: APIObject<AttributeSpec> | undefined = parentStructAttributes[parentAttributeName];
      if (!childAttribute) throw new Error('Assertion failed.');
      if (!parentAttribute) throw new Error('Assertion failed');
      if (
        childAttribute.spec.type !== parentAttribute.spec.type
        || (
          // Remember, sometimes length is undefined legitimately.
          childAttribute.spec.length
          && parentAttribute.spec.length
          && childAttribute.spec.length !== parentAttribute.spec.length
        )
      ) {
        throw new Error(
          'Mismatching types between these columns used in ForeignKeyConstraint '
          + `'${apiObject.metadata.name}': '${key.columnName}' and '${parentAttributeName}'.`,
        );
      }
    });
  },
};

export default kind;
