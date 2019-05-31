import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const iri: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'TEXT',
    checkConstraints: (spec: AttributeSpec): string[] => [
      `${spec.name} REGEXP '^[A-Za-z][A-Za-z0-9\\+\\.\\-]+:\\W+$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default iri;
