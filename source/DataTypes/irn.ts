import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

const irn: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'TEXT',
    checkConstraints: (spec: AttributeSpec): string[] => [
      `${spec.name} REGEXP '^urn:[A-Za-z0-9][A-Za-z0-9\\-]{0,30}[A-Za-z0-9]:[^\\w\\u0000-\\u001F"#<>]+$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default irn;
