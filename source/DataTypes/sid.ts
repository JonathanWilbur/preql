import DataType from '../DataType';

const sid: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'VARCHAR(128)',
    checkConstraints: (path: [ string, string, string ]): string[] => [
      `${path[2]} RLIKE '^S-\\d-\\d+(?:-\\d+)*$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default sid;
