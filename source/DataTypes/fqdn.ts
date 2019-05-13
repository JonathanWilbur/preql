import DataType from '../DataType';

const fqdn: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'VARCHAR(253)',
    checkConstraints: (path: [ string, string, string ]): string[] => [
      `${path[2]} RLIKE '^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\\-_\\.]{0,251}[\\p{L}\\p{N}])?$'`,
      `LENGTH(${path[2]}) <= 253`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default fqdn;
