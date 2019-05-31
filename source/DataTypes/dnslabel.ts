import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const dnslabel: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'VARCHAR(63)',
    checkConstraints: (spec: AttributeSpec): string[] => [
      `${spec.name} REGEXP '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\\-_]{0,61}[\\p{L}\\p{N}])?$'`,
      `LENGTH(${spec.name}) <= 63`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default dnslabel;
