import DataType from '../DataType';

const line: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'LINE',
    checkConstraints: (): string[] => [],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default line;
