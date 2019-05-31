import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const sid: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'VARCHAR(128)',
    checkConstraints: (spec: AttributeSpec): string[] => [
      `${spec.name} REGEXP '^S-\\d-\\d+(?:-\\d+)*$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default sid;
