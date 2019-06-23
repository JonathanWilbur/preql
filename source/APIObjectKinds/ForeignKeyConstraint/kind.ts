import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import schema from './schema';
import Spec from './spec';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import matchingResource from '../matchingResource';
import AttributeSpec from '../Attribute/spec';
import PreqlError from '../../PreqlError';
import ajv from '../../ajv';

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new PreqlError(
        'b8fa5bfb-0033-45ec-b455-44ca82be6c46',
        `No Databases found that are named '${apiObject.spec.databaseName}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!matchingResource(apiObject.spec.child.struct, 'struct', etcd)) {
      throw new PreqlError(
        '797317ff-ac7e-421f-92ce-e476624c04cc',
        `No Structs found that are named '${apiObject.spec.child.struct}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (!matchingResource(apiObject.spec.parent.struct, 'struct', etcd)) {
      throw new PreqlError(
        '9a15aca4-830c-4b30-bc6b-af76b5b663df',
        `No Structs found that are named '${apiObject.spec.parent.struct}' for ${apiObject.kind} `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }

    if (apiObject.spec.child.key.length !== apiObject.spec.parent.key.length) {
      throw new PreqlError(
        '6891f351-74c1-44d8-96bc-9cf2f46529e6',
        `Number of key Attributes in child Struct '${apiObject.spec.child.struct}' `
        + 'does not match the number of key Attributes in the parent Struct '
        + `'${apiObject.spec.parent.struct}' for the ForeignKeyConstraint named `
        + `'${apiObject.metadata.name}'.`,
      )
    }

    const attributes: APIObject<AttributeSpec>[] | undefined = etcd.kindIndex.attribute;
    if (!attributes || attributes.length === 0) {
      throw new PreqlError(
        '7836bfb0-1bba-41ce-9304-3914199cbaab',
        `No Attributes found for ${apiObject.kind} '${apiObject.metadata.name}' `
        + 'to use as keys.',
      );
    }

    const childStructAttributes: Record<string, APIObject<AttributeSpec>> = {};
    attributes
      .filter((attr: APIObject<AttributeSpec>): boolean => (
        attr.spec.structName.toLowerCase() === apiObject.spec.child.struct.toLowerCase()
        && attr.spec.databaseName.toLowerCase() === apiObject.spec.databaseName.toLowerCase()
      ))
      .forEach((attr: APIObject<AttributeSpec>): void => {
        childStructAttributes[attr.spec.name.toLowerCase()] = attr;
      });

    const parentStructAttributes: Record<string, APIObject<AttributeSpec>> = {};
    attributes
      .filter((attr: APIObject<AttributeSpec>): boolean => (
        attr.spec.structName.toLowerCase() === apiObject.spec.parent.struct.toLowerCase()
        && attr.spec.databaseName.toLowerCase() === apiObject.spec.databaseName.toLowerCase()
      ))
      .forEach((attr: APIObject<AttributeSpec>): void => {
        parentStructAttributes[attr.spec.name.toLowerCase()] = attr;
      });

    apiObject.spec.child.key.forEach((key: { attributeName: string }): void => {
      if (!(key.attributeName.toLowerCase() in childStructAttributes)) {
        throw new PreqlError(
          'f6aedee2-f31c-424e-bdff-b4a22b3abd4b',
          `Child Struct '${apiObject.spec.child.struct}' has no Attribute named `
          + `'${key.attributeName}' to which ForeignKeyConstraint `
          + `'${apiObject.metadata.name}' can apply.`,
        );
      }
    });

    apiObject.spec.parent.key.forEach((key: { attributeName: string }): void => {
      if (!(key.attributeName.toLowerCase() in parentStructAttributes)) {
        throw new PreqlError(
          '8374f93a-b002-44e3-9a4c-50b5be1cfc82',
          `Parent Struct '${apiObject.spec.parent.struct}' has no Attribute named `
          + `'${key.attributeName}' to which ForeignKeyConstraint `
          + `'${apiObject.metadata.name}' can apply.`,
        );
      }
    });

    // Note that nullability should not factor into the FKC.
    apiObject.spec.child.key.forEach((key: { attributeName: string }, index: number): void => {
      const childAttributeName: string = key.attributeName.toLowerCase();
      const childAttribute: APIObject<AttributeSpec> | undefined = childStructAttributes[childAttributeName];
      const parentAttributeName: string = apiObject.spec.parent.key[index].attributeName.toLowerCase();
      const parentAttribute: APIObject<AttributeSpec> | undefined = parentStructAttributes[parentAttributeName];
      if (!childAttribute) throw new Error('Assertion failed.');
      if (!parentAttribute) throw new Error('Assertion failed.');
      if (
        childAttribute.spec.type !== parentAttribute.spec.type
        || (
          // Remember, sometimes length is undefined legitimately.
          childAttribute.spec.length
          && parentAttribute.spec.length
          && childAttribute.spec.length !== parentAttribute.spec.length
        )
      ) {
        throw new PreqlError(
          '91263f5b-7d5b-47ca-b621-d609f9d63b36',
          'Mismatching types between these attribute used in ForeignKeyConstraint '
          + `'${apiObject.metadata.name}': '${key.attributeName}' and '${parentAttributeName}'.`,
        );
      }
    });
  },
};

export default kind;
