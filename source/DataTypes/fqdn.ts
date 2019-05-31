import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const fqdn: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'VARCHAR(253)',
    checkConstraints: (spec: AttributeSpec): string[] => [
      `${spec.name} REGEXP '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\\-_\\.]{0,251}[\\p{L}\\p{N}])?$'`,
      `LENGTH(${spec.name}) <= 253`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default fqdn;
