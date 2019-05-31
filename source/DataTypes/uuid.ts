import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const uuid: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'CHAR(36)',
    checkConstraints: (spec: AttributeSpec): string[] => [
      `${spec.name} REGEXP '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (spec: AttributeSpec): { [ name: string ]: string } => ({
      uppercase: `UPPER(${spec.name})`,
    }),
  },
};

export default uuid;
