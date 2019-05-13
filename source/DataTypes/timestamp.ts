import DataType from '../DataType';

const timestamp: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'TIMESTAMP',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default timestamp;
