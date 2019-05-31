import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const varchar: DataType = {
  mariadb: {
    equivalentNativeType: (spec: AttributeSpec): string => `VARCHAR(${spec.length || 256})`,
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default varchar;
