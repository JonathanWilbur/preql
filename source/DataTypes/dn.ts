import DataType from '../DataType';

// https://stackoverflow.com/questions/20360360/how-long-maximum-characters-is-an-ldap-distinguished-name
const dn: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'VARCHAR(256)',
    checkConstraints: (path: [ string, string, string ]): string[] => [
      `${path[2]} RLIKE '^\\X=\\X(?:(\\,|;)\\X=\\X)*$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default dn;
