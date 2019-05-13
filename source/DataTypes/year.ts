import DataType from '../DataType';

const year: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'YEAR',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default year;
