import DataType from '../DataType';

const date: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'DATE',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default date;
