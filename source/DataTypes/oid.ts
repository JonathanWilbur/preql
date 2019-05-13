import DataType from '../DataType';

const oid: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'VARCHAR(256)',
    checkConstraints: (path: [ string, string, string ]): string[] => [
      `${path[2]} RLIKE '^\\d+(?:\\.\\d+)*$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default oid;
