import DataType from '../DataType';
import AttributeSpec from '../APIObjectKinds/Attribute/spec';

// https://stackoverflow.com/questions/20360360/how-long-maximum-characters-is-an-ldap-distinguished-name
const dn: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'VARCHAR(256)',
    checkConstraints: (spec: AttributeSpec): string[] => [
      `${spec.name} REGEXP '^\\X=\\X(?:(\\,|;)\\X=\\X)*$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default dn;
