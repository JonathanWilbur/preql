import DataType from '../DataType';

const uuid: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'CHAR(36)',
    checkConstraints: (path: [ string, string, string ]): string[] => [
      `${path[2]} RLIKE '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (path: [ string, string, string ]): { [ name: string ]: string } => ({
      uppercase: `UPPER(${path[2]})`,
    }),
  },
};

export default uuid;
