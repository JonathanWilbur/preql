import DataType from '../DataType';

const irn: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'TEXT',
    checkConstraints: (path: [ string, string, string ]): string[] => [
      `${path[2]} RLIKE '^urn:[A-Za-z0-9][A-Za-z0-9\\-]{0,30}[A-Za-z0-9]:[^\\w\\u0000-\\u001F"#<>]+$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default irn;
