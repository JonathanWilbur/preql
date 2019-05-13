import DataType from '../DataType';

const toml: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'LONGTEXT',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default toml;
