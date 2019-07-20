import APIObject from '../../Interfaces/APIObject';
import APIObjectKind from '../../Interfaces/APIObjectKind';
import APIObjectDatabase from '../../Interfaces/APIObjectDatabase';
import schema from './schema';
import Spec from './spec';
import matchingResource from '../matchingResource';
import PreqlError from '../../PreqlError';
import ajv from '../../ajv';
import DataTypeSpec from '../DataType/spec';

const structureValidator = ajv.compile(schema);

const kind: APIObjectKind = {
  validateStructure: (apiObject: APIObject<Spec>): Promise<void> => structureValidator(apiObject.spec) as Promise<void>,
  validateSemantics: async (apiObject: APIObject<Spec>, etcd: APIObjectDatabase): Promise<void> => {
    if (!matchingResource(apiObject.spec.databaseName, 'database', etcd)) {
      throw new PreqlError(
        '76d5a336-be52-4e25-8b9e-a8ecf79c269c',
        `No Databases found that are named '${apiObject.spec.databaseName}' for Enum `
        + `'${apiObject.metadata.name}' to attach to.`,
      );
    }
    if (apiObject.spec.characterSet && !matchingResource(apiObject.spec.characterSet, 'characterset', etcd)) {
      throw new PreqlError(
        'c8b3ffc0-d4c0-4f63-9592-2342eb79b6d7',
        `No CharacterSets found that are named '${apiObject.spec.characterSet}' for Enum `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }
    if (apiObject.spec.collation && !matchingResource(apiObject.spec.collation, 'collation', etcd)) {
      throw new PreqlError(
        '5c66efb9-ecf9-4a18-886c-e83b4a2888ba',
        `No Collations found that are named '${apiObject.spec.collation}' for Enum `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }

    const encounteredValues: Set<string> = new Set<string>([]);
    const encounteredIndexes: Set<number> = new Set<number>([]);
    apiObject.spec.values.forEach(v => {
      if (encounteredValues.has(v.value)) {
        throw new PreqlError(
          '037c1cfe-1c72-48cb-a920-ceaf503ccdc9',
          `Duplicate value '${v.value}' in Enum '${apiObject.metadata.name}'.`,
        );
      }
      encounteredValues.add(v.value);

      if (!v.index) return;
      if (encounteredIndexes.has(v.index)) {
        throw new PreqlError(
          '54402b0a-b5b8-4415-8a46-217d22fd726e',
          `Duplicate index ${v.index} in Enum '${apiObject.metadata.name}'.`,
        );
      }
      encounteredIndexes.add(v.index);
    });

    const datatype: APIObject<DataTypeSpec> | undefined = (etcd.kindIndex.datatype || [])
      .find((obj: APIObject): boolean => obj.metadata.name === apiObject.spec.type);
    if (!datatype) {
      throw new PreqlError(
        '17bd1287-2c8d-4eb6-9de5-3f35639351ad',
        `No DataTypes found that are named '${apiObject.spec.type}' for Enum `
        + `'${apiObject.metadata.name}' to use.`,
      );
    }
    if (datatype.spec.jsonEquivalent !== 'string') {
      throw new PreqlError(
        '599ee515-7b56-47e1-ad60-06cf57198113',
        `Enum '${apiObject.metadata.name}' cannot use type `
        + `'${apiObject.spec.type}' because it is not fundamentally string-`
        + 'like.',
      );
    }
  },
};

export default kind;
