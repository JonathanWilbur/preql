import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const json: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'LONGTEXT',
    checkConstraints: (spec: AttributeSpec): string[] => [
      `JSON_VALID(${spec.name})`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default json;
