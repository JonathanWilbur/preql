import DataType from '../DataType';

const dnslabel: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'VARCHAR(63)',
    checkConstraints: (path: [ string, string, string ]): string[] => [
      `${path[2]} RLIKE '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\\-_]{0,61}[\\p{L}\\p{N}])?$'`,
      `LENGTH(${path[2]}) <= 63`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default dnslabel;
