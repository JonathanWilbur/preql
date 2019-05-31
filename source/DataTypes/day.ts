import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const day: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'TINYINT UNSIGNED',
    checkConstraints: (spec: AttributeSpec): string[] => [
      `${spec.name} > 0 AND ${spec.name} <= 31`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default day;
