import DataType from '../DataType';

const datetime: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'DATETIME',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default datetime;
