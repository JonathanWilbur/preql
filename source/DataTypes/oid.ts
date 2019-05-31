import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const oid: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'VARCHAR(256)',
    checkConstraints: (spec: AttributeSpec): string[] => [
      `${spec.name} REGEXP '^\\d+(?:\\.\\d+)*$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default oid;
