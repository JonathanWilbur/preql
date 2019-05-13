import DataType from '../DataType';

const money: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'DECIMAL(21,2)',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default money;
