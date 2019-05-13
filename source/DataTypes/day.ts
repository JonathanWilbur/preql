import DataType from '../DataType';

const day: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'TINYINT UNSIGNED',
    checkConstraints: (path: [ string, string, string ]): string[] => [
      `${path[2]} > 0 AND ${path[2]} <= 31`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default day;
