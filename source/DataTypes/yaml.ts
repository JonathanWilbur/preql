import DataType from '../DataType';

const yaml: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'LONGTEXT',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default yaml;
