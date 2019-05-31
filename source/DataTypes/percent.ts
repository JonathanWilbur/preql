import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const percent: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'DOUBLE UNSIGNED',
    checkConstraints: (spec: AttributeSpec): string[] => [
      `${spec.name} <= 100.00000000`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default percent;
