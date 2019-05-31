import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const fixchar: DataType = {
  mariadb: {
    equivalentNativeType: (spec: AttributeSpec): string => `CHAR(${spec.length || 256})`,
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default fixchar;
