import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
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
        '3d98139e-db3d-42de-83a7-1ef389c6ed2c',
        `No Databases found that are named '${apiObject.spec.databaseName}' for Struct `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (apiObject.spec.entityName && !matchingResource(apiObject.spec.entityName, 'entity', etcd)) {
      throw new PreqlError(
        '6fe4e182-ef83-48a4-a282-2a418009174c',
        `No Entities found that are named '${apiObject.spec.entityName}' for Struct `
        + `'${apiObject.metadata.name}' to be associated with.`,
      );
    }
    const attributeFound: boolean = (etcd.kindIndex.attribute || [])
      .some((attr: APIObject<AttributeSpec>): boolean => (
        attr.spec.databaseName === apiObject.spec.databaseName
        && attr.spec.structName === apiObject.spec.name
      ));
    if (!attributeFound) {
      throw new PreqlError(
        '2affcfab-2f7b-46be-84cf-4797dc8be7a6',
        `No Attributes found for Struct '${apiObject.metadata.name}'. Every`
        + ' Struct must have at least one Attribute.',
      );
    }
    if (apiObject.spec.characterSet && !matchingResource(apiObject.spec.characterSet, 'characterset', etcd)) {
      throw new PreqlError(
        '0d5be372-5fb4-401e-869b-06f5108d9f2b',
        `No CharacterSets found that are named '${apiObject.spec.characterSet}' for Struct `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }
    if (apiObject.spec.collation && !matchingResource(apiObject.spec.collation, 'collation', etcd)) {
      throw new PreqlError(
        '33313e20-bf74-4aa9-8c0a-a8e2637b5d4e',
        `No Collations found that are named '${apiObject.spec.collation}' for Struct `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }
  },
};

export default kind;
